import * as React from 'react';
import { Box, Button, Grid, GridItem, HeaderLayout, ContentLayout, TextInput, Status } from '@strapi/design-system';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import {Check} from '@strapi/icons';
import { useForm, Controller } from "react-hook-form";

import { useIntl } from 'react-intl'
import getTrad from "../../utils/getTrad";
import settingsRequests from '../../api/settings';
import useSWR from "swr";
import {fetcher} from "../../utils/fetcher";
import {InputTextList} from "../../components/InputTextList";

const Settings = () => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  const [isSaving, setIsSaving] = React.useState(false);

  const { data, error, isLoading } = useSWR(['/medusa-product-selector/settings', {}], fetcher)
  const { handleSubmit, control, setValue,watch } = useForm({
    defaultValues: {
      medusaServerBaseUrl: '',
      webhooksUrl: []
    }
  });

  React.useEffect(() => {
    setValue('medusaServerBaseUrl', data?.medusaServerBaseUrl)
    setValue('webhooksUrl', data?.webhooksUrl)
  }, [data])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log(name, value)
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    console.log(data);
    setIsSaving(true);
    await settingsRequests.setSettings(data);
    setIsSaving(false);
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: getTrad('settings-page.validation-message')
      }),
    });
  };

  if(error) return (
    <Status>
      {formatMessage({
        id: getTrad('common.error.message')
      })}
    </Status>
  )
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
            onClick={handleSubmit(onSubmit)}
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
          <form>
            <Grid gap={6}>
              <GridItem col={12} s={12}>
                <Controller
                  name="medusaServerBaseUrl"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      placeholder="http://localhost:8000"
                      label={formatMessage({
                        id: getTrad('settings-page.url.input-label')
                      })}
                      hint={formatMessage({
                        id: getTrad('settings-page.url.input-hint')
                      })}
                      disabled={data?.isLoadedFromConfig}
                      error={!data?.medusaServerBaseUrl ? formatMessage({id: getTrad('settings-page.error-message')}) : undefined}
                      defaultValue={data?.medusaServerBaseUrl}
                    />
                  )}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <Controller
                  name="webhooksUrl"
                  control={control}
                  render={({ field }) => (
                    <InputTextList
                      {...field}
                      placeholder="http://localhost:8000/revalidate"
                      label={formatMessage({
                        id: getTrad('settings-page.webhooks.input-label')
                      })}
                      error={!data?.medusaServerBaseUrl ? formatMessage({id: getTrad('settings-page.error-message')}) : undefined}
                      defaultValue={data?.medusaServerBaseUrl}
                    />
                  )}
                />
              </GridItem>
            </Grid>
          </form>
        </Box>
      </ContentLayout>
    </>
  );
};

export default Settings;
