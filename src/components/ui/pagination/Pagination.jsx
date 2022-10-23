import React, {useState} from 'react';
import CustomLink from '../link/CustomLink';

const Pagination = ({ advertsPerPage, totalAdverts, paginate }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAdverts / advertsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleLink = (e, number) => {
    e.preventDefault();
    setCurrentPage(paginate(number));
  }

  const page = {
    textDecoration: 'none',
    display: 'inline-block',
    lineHeight: '1',
  }

  const pagination = {
    boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
    textalign: 'center',
    listStyleType: 'none',
  }

  return (
    <div className={pagination}>
        {pageNumbers.map(number => (
          <CustomLink key={number} style={page} onClick={(e) => handleLink(e,number)} to='!#'>
            <div
             style={{
              backgroundColor: currentPage === number ? 'red' : 'white',
              borderRadius: '10px',
              margin: '10px',
              border: 'none',
              padding: '10px 20px',
              boxShadow: '0 0 15px 4px rgba(0,0,0,0.15)',
             }}
             key={number}
            >
              <div style={{color: currentPage === number ? 'white' : 'black' }}>
                {number}
              </div>
            </div>
          </CustomLink>
        ))}
    </div>
  );
};

export default Pagination;

