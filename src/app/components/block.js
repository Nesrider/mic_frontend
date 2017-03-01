import React from 'react';
import './block.scss';

export function block(item) {
	const date = new Date(item.publish_at);
	const dateString = date.toString().split(" ");

	return (<div key={item.id} className="col block col-sm-4 col-xs-12">
		<img src={item.image}/>
		<div className="block_title">
			{item.title}
		</div>
		<div>
			<div className="block_author block_text">
				{item.profile.first_name} {item.profile.last_name}
			</div>
			<div className="block_words block_text">
				· {"  "} Words: {item.words}
			</div>
			<div className="block_date block_text">
				· {"  "} {dateString[0]} {dateString[1]} {dateString[2]} {dateString[3]}
			</div>
		</div>
	</div>);
}
