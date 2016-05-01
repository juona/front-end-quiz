import React from 'react';
import Item from './Item.react';
import ItemStore from '../../stores/ItemStore';
import ItemStoreActions from '../../actions/ItemStoreActions';

import styles from './ItemList.css';

function getItemListState() {
	return {
		items: ItemStore.getAllItems()
	};
}

const ItemList = React.createClass({

	getInitialState() {
		return {
			items: []
		};
	},

	componentDidMount() {
		ItemStore.addItemsLoadedListener(this.onItemsLoaded);
		ItemStoreActions.loadItems();
	},

	onItemsLoaded() {
		this.setState(getItemListState());
	},

	loadMoreClickHandler() {
		ItemStoreActions.loadItems({
			start: this.state.items.length
		});
	},

	render() {
		const items = this.state.items.map((item, index) => (
			<li key={index} className={styles.li}>
				<Item
					imageURI={item.image}
					price={item.price && item.price.amounts && item.price.amounts.USD}
					description={item.title}
					key={index}
				/>
			</li>
		));

		var Button;
		if (ItemStore.isMoreItemsAvailable()) {
			Button = (
				<button type="button" className={styles.button} onClick={this.loadMoreClickHandler}>
					Load more
				</button>
			);
		}

		return (
			<div className={styles.container}>
				<ul className={styles.ul}>
					{items}
				</ul>
				{Button}
			</div>
		);
	}

});

module.exports = ItemList;