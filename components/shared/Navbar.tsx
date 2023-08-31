import React from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Burger, Button, Flex, Group, Menu, NavLink, clsx, createStyles } from '@mantine/core';
import Link from 'next/link';
import { links } from '../../data/headerLinks';

type Props = {};

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colorScheme === 'dark' ? '#fff' : theme.colors.dark[7],
    textDecoration: 'none',
    transition: 'color 200ms ease',
    '&:hover': {
      color: theme.colorScheme === 'dark' ? '#fff' : theme.colors.dark[7],
    },
  },
  bold: {
    fontWeight: 700,
    fontSize: theme.fontSizes.lg,
  },
  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  menu: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));
export default function Navbar({}: Props) {
  const { classes } = useStyles();
  const [opened, setOpened] = React.useState(false);

  console.log(links);

  return (
    <Flex
      mih={50}
      gap="xl"
      justify="space-between"
      px="lg"
      py="md"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Link className={clsx(classes.link, classes.bold)} href="/">
        Omar Mohamed
      </Link>

      <Group className={classes.links}>
        {links.map((link) => {
          return (
            <Link key={link.label} className={classes.link} href={link.link}>
              {link.label}
            </Link>
          );
        })}

        <Button color="violet">New Blog</Button>

        <ColorSchemeToggle />
      </Group>

      <Menu width="50%">
        <div className={classes.menu}>
          <Menu.Target>
            <Burger
              opened={opened}
              aria-label="Toggle menu"
              onClick={() => {
                setOpened(!opened);
              }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Flex direction="column" gap={10} px={15} py="md">
              {links.map((link) => {
                return (
                  <Link key={link.label} className={classes.link} href={link.link}>
                    {link.label}
                  </Link>
                );
              })}

              <Flex w="100%" direction="row" justify="space-between">
                <Button color="violet">New Blog</Button>
                <ColorSchemeToggle />
              </Flex>
            </Flex>
          </Menu.Dropdown>
        </div>
      </Menu>
    </Flex>
  );
}
