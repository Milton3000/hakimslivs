import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';
import 'iconify-icon';


const Categories = ({ setProducts }) => {
    const getCategory = async (category) => {
        try {
            const response = await axios.get(`/api/products/category/${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const [expandedItems, setExpandedItems] = React.useState([]);

    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItems(itemIds);
    };

    return (
        <Box sx={{ flexGrow: 1, minWidth: 200, maxWidth: 200 }}>
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
                    <TreeItem itemId="item1" label={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:milk" width="18" height="18"  style={{color: '#3184dd'}} />
                            <span style={{ marginTop: '3px', marginLeft: '2px' }}>Mejeri</span>
                        </div>
                        }>

                        <TreeItem itemId="item2" label="Mjölk och tacos" onClick={() => getCategory('Mejeri')} />
                    </TreeItem>

                    <TreeItem itemId="item5" label={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="line-md:beer-alt-twotone-loop" width="18" height="18"  style={{color: '#3184dd'}} />
                            <span style={{ marginTop: '3px', marginLeft: '2px' }}>Dryck</span>
                        </div>
                        }>
                        <TreeItem itemId="item6" label="Läsk" onClick={() => getCategory('Dryck')} />
                    </TreeItem>

                    <TreeItem itemId="item7" label={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <iconify-icon icon="icon-park-outline:candy" width="18" height="18"  style={{color: '#3184dd'}} />
                            <span style={{ marginTop: '3px', marginLeft: '2px' }}>Snacks & Godis</span>
                        </div>
                        }>
                        <TreeItem itemId="item8" label="Allt möjligt" onClick={() => getCategory('Snacks & Godis')} />
                    </TreeItem>
                    
                </SimpleTreeView>
            </Box>
        </Box>
    );
}

export default Categories;