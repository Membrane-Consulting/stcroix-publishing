import React, { useState, useEffect } from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput, Flex, Text, Box, Card } from '@sanity/ui'
import client from 'part:@sanity/base/client'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id'

const seoTitle = React.forwardRef((props, ref) => {

  const [siteTitle, setSiteTitle] = useState('Loading')

  useEffect(() => {
    const getTitle = async () => {
      try {
        const query = `*[_type == "settings"][0]{ siteTitle }`
        const { siteTitle: title } = await client.fetch(query)
        await setSiteTitle(title)
      } catch (e) {
        console.log(e)
      }
    }
    getTitle();
  })

  const {
    type, 
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur, 
    onChange
  } = props

  const handle = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
  }, [onChange])

  const inputId = useId()

  return (
    <FormField
      description={type.description}
      title={type.title}
      compareValue={compareValue}
      markers={markers}
      presence={presence}
      inputId={inputId}
    >
      <Flex>
        <Flex 
          as={Card} 
          paddingX={3} 
          border 
          borderRight={false} 
          align="center"
        >
          <Text muted>{siteTitle && siteTitle}</Text>
        </Flex>
        <Box flex={1}>
          <TextInput 
            id={inputId}
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handle}
          />
        </Box>
      </Flex>
    </FormField>
  )
})

export default seoTitle