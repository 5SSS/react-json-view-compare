import React, { useState, useEffect } from 'react';
import Tree from './tree.js';
import { mergeData, isArray } from './utils.js';
const JsonCompare = props => {

	let { oldData, newData } = props;
	let [data, setMergeData] = useState([]);
	let [tree, updateTree]  = useState();

	useEffect(() => {
		setMergeData(mergeData(oldData, newData));
	}, [oldData, newData]);

	if(data.length && !tree){

		updateTree(
			data.map((item, index) => (
		      <Tree key={index} {...item} />
		    ))
		)

	}

	return <>
	<div className={"differ diff-left"}>
		<pre className="c-json-view">
			{tree}
		</pre>
	</div>
	<div className={"differ diff-right"}>
		<pre className="c-json-view">
			{tree}
		</pre>
	</div>
	</>

};

export default JsonCompare;
