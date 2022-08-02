import { Player } from '@lottiefiles/react-lottie-player';
import { Button, Container, createStyles, Group, Text, Title } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import * as Lottie from '../components/plugins/11116-404-planet-animation.json';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFoundTitle() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <Head>
        <title>Biofip - 404</title>
      </Head>
      <Player
        autoplay
        loop
        src={Lottie}
        style={{ width: '350px', height: '350px' }} />
      <Title className={classes.title}>Username or Page not found.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the username or page URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => router.push('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}