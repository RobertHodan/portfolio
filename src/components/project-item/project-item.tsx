import React from 'react';
import './project-item.scss';
import { Link } from 'react-router-dom';

type ProjectItemProps = {
  title: string,
  companyName: string,
  description: string,
  companyLink?: string,
  imageSrc?: string,
  page?: string,
}

export function ProjectItem(props: ProjectItemProps) {
  const imageSrc = props.imageSrc;
  let companyName = ( <h2>{props.companyName}</h2> );
  if (props.companyLink) {
    companyName = (
      <a href={props.companyLink}>
        {companyName}
      </a>
    )
  }

  return (
    <div className={'project-item'}>
      <Link to={props.page || ''} tabIndex={-1}>
        <img src={imageSrc}></img>
      </Link>
      <div className={'project-details'}>
        <Link to={props.page || ''}>
          <h1>{ props.title }</h1>
        </Link>
        { companyName }
        <p>{ props.description }</p>
      </div>
    </div>
  );
}
