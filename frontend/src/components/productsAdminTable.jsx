import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteProduct } from '../adminhooks/deleteProduct'; // Changed from useDeleteUser
import { useGetProducts } from '../adminhooks/getProducts'; // Changed from useGetUsers
import { useUpdateProduct } from '../adminhooks/updateProduct'; // Changed from useUpdateUser
import { useCreateProduct } from '../adminhooks/createProduct'; // Changed from useCreateUser

const AdminTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isIdVisible, setIsIdVisible] = useState(true);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: 'title',
        header: 'Product Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'brand',
        header: 'Brand',
      },
      {
        accessorKey: 'origin',
        header: 'Origin',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
      },
      {
        accessorKey: 'TOC',
        header: 'TOC',
      },
      {
        accessorKey: 'imageUrl',
        header: 'Image',
      },
    ];

    if (!isIdVisible) {
      baseColumns.unshift({
        accessorKey: '_id',
        header: 'ID',
      });
    }

    return baseColumns;
  }, [isIdVisible, validationErrors]);

  //call CREATE hook
  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct(); // Changed from useCreateUser
  //call READ hook
  const {
    data: fetchedProducts = [],
    isError: isLoadingProductsError,
    isFetching: isFetchingProducts,
    isLoading: isLoadingProducts,
  } = useGetProducts(); // Changed from useGetUsers

  //call UPDATE hook
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct(); // Changed from useUpdateUser
  //call DELETE hook
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct(); // Changed from useDeleteUser

  //CREATE action
  const handleCreateProduct = async ({ values, table }) => {
    await createProduct(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveProduct = async ({ values, table }) => {
    await updateProduct(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    console.log(row.original);
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(row.original);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedProducts,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingProductsError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => {
      setValidationErrors({});
      setIsIdVisible(true); // Set isIdVisible to false when the create modal is cancelled
    },
    onCreatingRowSave: (newData) => {
      handleCreateProduct(newData);
      setIsIdVisible(true); // Set isIdVisible to false when the create modal is closed
    },
    onEditingRowCancel: () => {
      setValidationErrors({});
      setIsIdVisible(true); // Set isIdVisible to false when the edit modal is cancelled
    },
    onEditingRowSave: (newData) => {
      handleSaveProduct(newData);
      setIsIdVisible(true); // Set isIdVisible to false when the edit modal is closed
    },

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Add Product</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Product</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setIsIdVisible(false);
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //enter creating mode
        }}
      >
        Create New Product
      </Button>
    ),
    state: {
      isLoading: isLoadingProducts,
      isSaving:
        isCreatingProduct || isUpdatingProduct || isDeletingProduct,
      showAlertBanner: isLoadingProductsError,
      showProgressBars: isFetchingProducts,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default AdminTable;
