import sanityClient from '@sanity/client'
// import {basename} from 'path'
// import {createReadStream} from 'fs'
// import { sanity } from '$lib/sanityClient'

type PurchaseOrderDoc = {
  _type:string
  customerName:string
  customerEmail:string
  submittedAt:string
  processed:boolean
} 

/** Uploads a new purchase order to Sanity & Sends an email notification */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }){
  
  const body = await request.formData()

  const submittedAt = new Date().toISOString()
  const customerName = body.get("name")
  const slugName = customerName.replace(" ", "-").toLowercase()
  const customerEmail = body.get("email")

  const filename = `purchase-order-${slugName}-${submittedAt}`
  const file = await body.get("file")

  const doc:PurchaseOrderDoc = {
    _type: 'purchaseOrder',
    processed: false,
    customerName,
    customerEmail,
    submittedAt,
  }

  // console.log(doc)

  try {
    const res = await sanityAuthClient
      .create(doc)
      .then((res) => {
        console.log(`Document Created! ID: ${res._id}`)
      
        sanityAuthClient.assets
          .upload('file', file, {
            filename: filename
          })
          .then(asset => {
            // Here you can decide what to do with the returned asset document. 
            // If you want to set a specific asset field you can to the following:
            return sanityAuthClient
              .patch(res._id)
              .set({
                purchaseOrderFile: {
                  _type: 'file',
                  asset: {
                    _type: "reference",
                    _ref: asset._id
                  }
                }
              })
              .commit()
          })
          .then(() => {
            console.log("Done!");
          })
        
      })
      .catch(e => console.log(`Error while creating document: ${e}`))
    return {
      status: 200,
      body: res,
      headers: {
        Location: '/order?status=success'
      }
    } 
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      body: {
        error: error
      },
      headers: {
        Location: '/order?status=error'
      }
    }
  }
}

const sanityAuthClient = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID.toString(),
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: process.env["SANITY_WRITE_TOKEN"],
  useCdn: false,
})