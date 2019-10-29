import React from 'react';
import './project-item.scss';
import placeholderPNG from '../../projects/placeholder.png';
import { Link } from 'react-router-dom';

type ProjectItemProps = {
  title: string,
  companyName: string,
  description: string,
  imageSrc?: string,
  page?: string,
}

export function ProjectItem(props: ProjectItemProps) {
  const imageSrc = props.imageSrc || placeholderPNG;

  return (
    <div className={'project-item'}>
      <Link to={props.page || ''}>
        <img src={imageSrc}></img>
      </Link>
      <div className={'project-details'}>
        <Link to={props.page || ''}>
          <h1>{ props.title }</h1>
        </Link>
        <h2>{ props.companyName }</h2>
        <p>{ props.description }</p>
      </div>
    </div>
  );
}
