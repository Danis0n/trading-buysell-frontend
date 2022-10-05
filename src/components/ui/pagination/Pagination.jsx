import React from 'react';
import cl from './Pagination.module.css'
import CustomLink from '../link/CustomLink';

const Pagination = ({ advertsPerPage, totalAdverts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAdverts / advertsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleLink = (e, number) => {
    e.preventDefault();
    paginate(number);
  }

  return (
    <div className={cl.pagination}>
      <ul className={cl.ul}>
        {pageNumbers.map(number => (
            <li className={cl.form} key={number}>
                <CustomLink className={cl.page} onClick={(e) => handleLink(e,number)} to='!#'>
                {number}
                </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

