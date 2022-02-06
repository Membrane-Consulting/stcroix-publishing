// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Schemas
  // Re-usable Objects
  import portableText from './objects/portableText'
  import seo from './objects/seo'
  // Text Parts
  import chapter from './objects/text-parts/chapter'

  // Documents
  import settings from './documents/settings'
    // Webpages
    import homePage from './documents/webpages/homePage'
    import aboutPage from './documents/webpages/aboutPage'
    import contactPage from './documents/webpages/contactPage'
    import textsPage from './documents/webpages/textsPage'
    import purchaseOrderPage from './documents/webpages/purchaseOrderPage'
    // Texts
    import textbook from './documents/textBook'
    // Purchase Orders
    import purchaseOrder from './documents/purchase-orders/purchaseOrder'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Re-usable Objects
    portableText,
    seo,
    chapter,
    // Documents
    settings,
    purchaseOrder,
      // Webpages
      homePage,
      aboutPage,
      contactPage,
      textsPage,
      purchaseOrderPage,
      // Texts
      textbook,
  ]),
})
