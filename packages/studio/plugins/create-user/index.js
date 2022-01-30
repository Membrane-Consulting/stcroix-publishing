import React, { useEffect, useState } from "react";
import getIt from "get-it";
import jsonResponse from "get-it/lib/middleware/jsonResponse";
import promise from "get-it/lib/middleware/promise";
import { DashboardWidget } from "@sanity/dashboard";
import { Button, Flex, Card, Code, Box, Stack, Text, TextInput, useToast } from "@sanity/ui";

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient('https://qiisuqsjiwfgceujuhgc.supabase.co', process.env.SANITY_STUDIO_SUPABASE_SECRET)

const request = getIt([promise(), jsonResponse()]);

function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(undefined);
  
  const toast = useToast();

  const createUser = async () => {
    setIsLoading(true);
    try {
      const { data: user, error } = await supabase.auth.api
        .inviteUserByEmail(value);
      toast.push({
        status: 'success',
        title: 'User created!'
      })
      setIsLoading(false); 
    } catch (e) {
      toast.push({
        status: 'error',
        title: 'Error while creating user!'
      })
      console.error(e)
      setIsLoading(false);
    }
  };

  return (
    <DashboardWidget
        header="Invite a User"
        footer={
          <Flex direction="column" align="stretch">
            <Button
              flex={1}
              paddingX={2}
              paddingY={4}
              mode="bleed"
              tone="primary"
              text="Create User"
              type="submit"
              justify="center"
              onClick={() => createUser()}
            />
          </Flex>
        }
      >
        
      {error && (
        <Card paddingX={3} paddingY={4} tone="critical">
          <Code>{JSON.stringify(error, null, 2)}</Code>
        </Card>
      )}
      {!error && (
        <Box padding={4} paddingY={5}>
          <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) =>
              setValue(event.currentTarget.value)
            }
            padding={[3, 3, 4]}
            placeholder="Email Address"
            value={value}
          />
        </Box>
      )}
    </DashboardWidget>
  );
}

export default {
  name: "create-user",
  component: CreateUser,
};
