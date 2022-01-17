import sanityClient from '@sanity/client'
import { sanity } from '$lib/sanityClient'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }){
  const query = url.search
  const items:URLSearchParams = new URLSearchParams(query)

  for (const [key, value] of items){
    if (key === 'query'){
      const res = await sanity.fetch(value)
      return {
        status: 200,
        body: res
      }
    } else {
      return {
        status: 500,
        body: 'Incorrect Query Parameters'
      }
    }
  }

  return {
    status: 500,
    body: 'Query Failed'
  }

}

type PurchaseOrderDoc = {
  _type:string
  customerName:string
  customerEmail:string
  submittedAt:string
  processed:boolean
  purchaseOrderFile:any
} 

/** Uploads a new purchase order to Sanity & Sends an email notification */
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body }){
  
  const { customerName, customerEmail, purchaseOrderFile } = body

  const doc:PurchaseOrderDoc = {
    _type: 'purchaseOrder',
    processed: false,
    customerName: customerName,
    customerEmail: customerEmail,
    submittedAt: new Date().toUTCString(),
    purchaseOrderFile: purchaseOrderFile,
  }

  console.log(doc)

  try {
    const res = await sanityAuthClient.create
    return {
      status: 200,
    } 
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      body: {
        error: error
      }
    }
  }
}

const sanityAuthClient = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID.toString(),
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: process.env["SANITY_WRITE_TOKEN"],
  useCdn: true,
})