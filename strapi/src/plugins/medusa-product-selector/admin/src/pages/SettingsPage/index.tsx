import * as React from 'react';

import settingsRequests from '../../api/settings';

import { Box, Stack, Button, Grid, GridItem, HeaderLayout, ContentLayout, Typography, TextInput, Information, Tooltip } from '@strapi/design-system';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import {Check} from '@strapi/icons';

const Settings = () => {
  const [settings, setSettings] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const toggleNotification = useNotification();

  const updateSettingsValue = (key, value) => {
    setSettings(current => {
      const settings = current;

      settings[key] = value;

      return settings;
    });
  };

  const fetchData = async () => {
    if(isLoading === false) setIsLoading(true)
    const settings = await settingsRequests.getSettings()
    setSettings(settings)
    setIsLoading(false)
  }

  const handleSubmit = async () => {
    setIsSaving(true);
    const res = await settingsRequests.setSettings(settings);
    console.log(res)
    //setSettings(res.data.settings);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: 'Settings successfully updated',
    });
  };

  React.useEffect(() => {
    const fetch = async () => {
      await fetchData()
    };

    fetch().then();
  }, []);

  if(isLoading) return <LoadingIndicatorPage />

  return (
    <>
      <HeaderLayout
        id="title"
        title="Medusa Product Selector - API Settings"
        subtitle="Manage the settings about your Medusa Server."
        primaryAction={
          <Button
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
            disabled={isSaving}
            loading={isSaving}
          >
            Save
          </Button>
        }
      />
      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Stack>
            <Grid gap={6}>
              <GridItem col={12} s={12}>
                <TextInput
                  placeholder="http://localhost:8000"
                  label="Backend URL:"
                  name="medusaServerBaseUrl"
                  hint={<span>Enter the URL of your Medusa API to fetch products. It can be loaded from <u>MEDUSA_SERVER_BASE_URL</u> environment variable.</span>}
                  disabled={settings.isLoadedFromConfig}
                  error={!settings.medusaServerBaseUrl ? "Can't be empty." : undefined}
                  onChange={e => updateSettingsValue('medusaServerBaseUrl', e.target.value)}
                  defaultValue={settings.medusaServerBaseUrl}
                  value={settings.isLoadedFromConfig ? settings.medusaServerBaseUrl : undefined}
                />
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  );
};

export default Settings;
