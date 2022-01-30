import { Button, Flex, Card, Code, Box, Stack, Text, TextInput, useToast } from "@sanity/ui";
import { useSecrets, SettingsView } from 'sanity-secrets'
import { DashboardWidget } from "@sanity/dashboard";
import React, { useEffect, useState } from "react";

import { createClient } from '@supabase/supabase-js'

const configKeys = [{
  key: 'supabaseSecret',
  title: 'Supabase secret API Key'
}]

function CreateUser() {
  const [showSettings, setShowSettings] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const namespace = "create-user-plugin";
  const { secrets } = useSecrets(namespace);

  const toast = useToast();

  const createUser = async () => {
    const supabase = createClient('https://qiisuqsjiwfgceujuhgc.supabase.co', secrets.supabaseSecret);

    const devMode = process.env.NODE_ENV == 'development';
    const url = devMode ? 'http://localhost:3000' : 'https://stcroixpublishing.com';

    setCreatingUser(true)

    try {
      await supabase.auth.api
        .inviteUserByEmail(email, { redirectTo: `${url}/invite` });

      toast.push({
        status: 'success',
        title: 'User created!'
      })
    } catch (e) {
      toast.push({
        status: 'error',
        title: 'Error while creating user!'
      })
      
      console.error(e)
    }

    setCreatingUser(false);
  };

  return (
    <DashboardWidget
        header="Invite a User"
        footer={
          <Flex direction="column" align="stretch">
            <Button
              flex={1}
              text="Update Secret"
              paddingY={3}
              paddingX={1}
              style={{ margin: "8px" }}
              onClick={() => setShowSettings(true)}/>

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
              disabled={creatingUser}
            />
          </Flex>
        }
      >

      {showSettings && <SettingsView namespace={namespace} keys={configKeys} onClose={() => setShowSettings(false) } />}
        
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
              setEmail(event.currentTarget.value)
            }
            padding={[3, 3, 4]}
            placeholder="Email Address"
            value={email}
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
