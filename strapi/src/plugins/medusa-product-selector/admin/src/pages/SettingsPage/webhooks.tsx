import * as React from 'react';

import { Box, Stack, Button, Grid, GridItem, HeaderLayout, ContentLayout, TextInput } from '@strapi/design-system';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import {Check} from '@strapi/icons';
import { useIntl } from 'react-intl'
import getTrad from "../../utils/getTrad";
import settingsRequests from '../../api/settings';
import {InputTextList} from "../../components/InputTextList";

const Settings = () => {
  const { formatMessage } = useIntl();

  const [settings, setSettings] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const toggleNotification = useNotification();

  const updateSettingsValue = (key, value) => {
    setSettings(current => {
      const settings = current;

      settings[key] = value;

      return settings;
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    await settingsRequests.setSettings(settings);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: getTrad('settings-page.validation-message')
      }),
    });
  };

  //if(isLoading) return <LoadingIndicatorPage />

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
                <InputTextList label={'webhooks'} value={settings} onChange={setSettings} />
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  );
};

export default Settings;
