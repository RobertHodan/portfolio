import React from 'react';
import './project-item.scss';
import placeholderPNG from '../../projects/placeholder.png';

type ProjectItemProps = {
  title: string,
  companyName: string,
  description: string,
  imageSrc?: string,
}

export function ProjectItem(props: ProjectItemProps) {
  const imageSrc = props.imageSrc || placeholderPNG;

  return (
    <div className={'project-item'}>
      <img src={imageSrc}></img>
      <div className={'project-details'}>
        <h1>{ props.title }</h1>
        <h2>{ props.companyName }</h2>
        <p>{ props.description }</p>
      </div>
    </div>
  );
}
