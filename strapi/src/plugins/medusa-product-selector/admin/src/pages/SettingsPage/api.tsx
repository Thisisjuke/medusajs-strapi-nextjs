import * as React from 'react';

import { Box, Stack, Button, Grid, GridItem, HeaderLayout, ContentLayout, TextInput } from '@strapi/design-system';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import {Check} from '@strapi/icons';
import { useIntl } from 'react-intl'
import getTrad from "../../utils/getTrad";
import settingsRequests from '../../api/settings';

const Settings = () => {
  const { formatMessage } = useIntl();

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
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: getTrad('settings-page.validation-message')
      }),
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
        title={formatMessage({
          id: getTrad('settings-page.title')
        })}
        subtitle={formatMessage({
          id: getTrad('settings-page.subtitle')
        })}
        primaryAction={
          <Button
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
            disabled={isSaving}
            loading={isSaving}
          >
            {formatMessage({
              id: getTrad('settings-page.cta')
            })}
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
                  name="medusaServerBaseUrl"
                  placeholder="http://localhost:8000"
                  label={formatMessage({
                    id: getTrad('settings-page.input-label')
                  })}
                  hint={formatMessage({
                    id: getTrad('settings-page.input-hint')
                  })}
                  disabled={settings.isLoadedFromConfig}
                  error={!settings.medusaServerBaseUrl ? formatMessage({id: getTrad('settings-page.error-message')}) : undefined}
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
