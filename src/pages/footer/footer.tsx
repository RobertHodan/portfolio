import React, { useCallback } from 'react';
import { createMapFromLabels } from '../../utils/utils';
import { List } from '../../components/list/list';
import { ListItemProps } from '../../components/list-item/list-item';
import './footer.scss';
import emailIcon from '../../icons/email.svg';
import githubIcon from '../../icons/github.svg';
import twitterIcon from '../../icons/twitter.svg';

export function Footer() {
  const mapToData: any = {
    'roberthodan@outlook.com': {
      href: 'mailto:roberthodan@outlook.com',
      icon: emailIcon,
    },
    '@RobertHodan': {
      href: 'https://twitter.com/RobertHodan',
      icon: twitterIcon,
    },
    'RobertHodan': {
      href: 'https://github.com/RobertHodan',
      icon: githubIcon,
    },
  }
  const [map, order] = createMapFromLabels(Object.keys(mapToData));
  const item = useCallback((props: ListItemProps) => {
    if (!props.label) {
      return;
    }

    return (
      <a href={mapToData[props.label].href}>
        <div className='icon'>
          <img src={mapToData[props.label].icon}></img>
        </div>
        {props.label}
      </a>
    )
  }, []);

  return (
    <footer className={'footer'}>
      <p>Robert Hodan &copy; Copyright 2019</p>
      <List
        listMap={ map }
        listOrder={ order }
        functionItemContent={ item }
        className={ 'contact-links' }
      ></List>
    </footer>
  );
}