import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';
import 'iconify-icon';

const Categories = ({ fetchProductsByCategory, setProducts, setCategoryTitle }) => {
    const getCategory = async (category) => {
        try {
            if (category === 'all-products') {
                setCategoryTitle('Alla Produkter');
                const response = await axios.get('https://hakimslivs-backend.onrender.com/api/products/all');
                const products = response.data;
                setProducts(products);
            } else {
                const response = await axios.get(`https://hakimslivs-backend.onrender.com/api/products/category/${category}`);
                const products = response.data;
                fetchProductsByCategory(category, products);
                if (category !== 'POPULÄRT JUST NU') {
                    setCategoryTitle(category);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const [expandedItems, setExpandedItems] = React.useState([]);

    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItems(itemIds);
    };
    

    return (
        <Box sx={{ flexGrow: 1, minWidth: 270, maxWidth: 270 }}>
            <Box sx={{ mb: 1 }}>
            </Box>
            <Box sx={{ minHeight: 200, flexGrow: 1 }}>
                <SimpleTreeView
                    expandedItems={expandedItems}
                    onExpandedItemsChange={handleExpandedItemsChange}
                    sx={{
                        '& .MuiTreeItem-label': {
                            textAlign: 'left',
                        },
                    }}
                >
                    <TreeItem
                        itemId="all-products"
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <iconify-icon
                                    icon="icon-park-outline:shopping-cart"
                                    width="32"
                                    height="32"
                                    style={{ color: '#3184dd' }}
                                />
                                <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Alla Produkter</span>
                            </div>
                        }
                        onClick={() => getCategory('all-products')}
                    >
                    </TreeItem>

                    <TreeItem itemId="row1" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:watermelon-one" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Chark</span>
                        </div>
                    } onClick={() => getCategory('Chark')}>
                    </TreeItem>

                    <TreeItem itemId="row2" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:milk" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Mejeri</span>
                        </div>
                    } onClick={() => getCategory('Mejeri')}>
                    </TreeItem>

                    <TreeItem itemId="row3" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:apple-one" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Frukt och Grönt</span>
                        </div>
                    } onClick={() => getCategory('Frukt & Grönt')}>
                    </TreeItem>

                    <TreeItem itemId="row4" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:canned-fruit" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Torrvaror</span>
                        </div>
                    } onClick={() => getCategory('Torrvaror')}>
                    </TreeItem>

                    <TreeItem itemId="row5" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="line-md:beer-alt-twotone-loop" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Dryck</span>
                        </div>
                    } onClick={() => getCategory('Dryck')}>
                    </TreeItem>

                    <TreeItem itemId="row16" label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:candy" width="32" height="32" style={{ color: '#3184dd' }} />
                            <span style={{ marginTop: '5px', marginLeft: '5px', fontSize: '20px' }}>Snacks & Godis</span>
                        </div>
                    } onClick={() => getCategory('Snacks & Godis')}>
                    </TreeItem>

                </SimpleTreeView>
            </Box>
        </Box>
    );
}

export default Categories;
