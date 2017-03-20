import React from 'react';

export function SmallCard({children}) {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="card">
        <div className="content">
          <div className="row">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BigCard({title, date, children}) {
  return (
    <div className="col-xs-12">
      <div className="card">
        <div className="header">
          <h4 className="title">{title}</h4>
          <p className="category">{date}</p>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}
