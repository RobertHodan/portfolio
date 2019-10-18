import React from 'react';
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
      href: '',
      icon: emailIcon,
    },
    '@RobertHodan': {
      href: '',
      icon: twitterIcon,
    },
    'RobertHodan': {
      href: '',
      icon: githubIcon,
    },
  }
  const [map, order] = createMapFromLabels(Object.keys(mapToData));
  const item = (props: ListItemProps) => {
    return (
      <a href={mapToData[props.label].href}>
        <div className='icon'>
          <img src={mapToData[props.label].icon}></img>
        </div>
        {props.label}
      </a>
    )
  }

  return (
    <footer className={'footer'}>
      <p>Robert Hodan &copy; Copyright 2019</p>
      <List
        list={ map }
        listOrder={ order }
        itemChildren={ item }
        className={ 'contact-links' }
      ></List>
    </footer>
  );
}