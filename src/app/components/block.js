import React from 'react';

export function block(item) {
	return (<div key={item.id} className="col block col-sm-4 col-xs-12">
		<img src={item.image}/>
		<div className="block_title block_text">
			{item.title}
		</div>
		<div className="block_author block_text">
			{item.author}
		</div>
	</div>);
}
