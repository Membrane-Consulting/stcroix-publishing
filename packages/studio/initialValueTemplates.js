export default [
 ...T.defaults().filter(item => console.log(item.spec.schemaType) || !item.spec.schemaType.includes('purchaseOrder')),
]