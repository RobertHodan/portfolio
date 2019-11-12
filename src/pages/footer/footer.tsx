import React, { useCallback } from 'react';
import { createMapFromLabels } from '../../utils/utils';
import { List } from '../../components/list/list';
import { ListItemProps } from '../../components/list-item/list-item';
import './footer.scss';
import { EmailIcon, TwitterIcon, GitHubIcon } from '../../icons/icons';

export function Footer() {
  const mapToData: any = {
    'roberthodan@outlook.com': {
      href: 'mailto:roberthodan@outlook.com',
      icon: EmailIcon,
    },
    '@RobertHodan': {
      href: 'https://twitter.com/RobertHodan',
      icon: TwitterIcon,
    },
    'RobertHodan': {
      href: 'https://github.com/RobertHodan',
      icon: GitHubIcon,
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
          {mapToData[props.label].icon}
        </div>
        {props.label}
      </a>
    )
  }, []);

  return (
    <footer className={'footer'} id="contact">
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