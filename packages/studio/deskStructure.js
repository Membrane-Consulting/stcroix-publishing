import S from '@sanity/desk-tool/structure-builder'

import {
  MdHomeFilled,
  MdSpeakerNotes,
  MdMarkEmailUnread,
  MdMenuBook,
  MdSettings,
  MdOutlineWeb,
  MdCardMembership
} from 'react-icons/md'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Webpages')
        .child(
          S.list()
            .title('Web Content')
            .id('web-content')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.editor()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page')
                )
                .icon(MdHomeFilled),
              S.listItem()
                .title('About Page')
                .child(
                  S.editor()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page')
                )
                .icon(MdSpeakerNotes),
              S.listItem()
                .title('Contact Page')
                .child(
                  S.editor()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('Contact Page')
                )
                .icon(MdMarkEmailUnread),
                S.listItem()
                .title('Texts Page')
                .child(
                  S.editor()
                    .schemaType('textsPage')
                    .documentId('textsPage')
                    .title('Texts Page')
                )
                .icon(MdMenuBook),
                S.listItem()
                .title('Purchase Order Page')
                .child(
                  S.editor()
                    .schemaType('purchaseOrderPage')
                    .documentId('purchaseOrderPage')
                    .title('Purchase Order Page')
                )
                .icon(MdCardMembership),
            ])
        )
        .icon(MdOutlineWeb),
      S.listItem()
        .title('Text Books')
        .child(
          S.documentTypeList('textbook')
            .title('Text Books')
            .child((documentId) =>
              S.document()
                .id('textbook')
                .schemaType('textbook')
                .documentId(documentId)
            )
        )
        .icon(MdMenuBook),
        S.divider(),
        S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .schemaType('settings')
            .documentId('settings')
            .title('Site Settings')
        )
        .icon(MdSettings),
      
    ])