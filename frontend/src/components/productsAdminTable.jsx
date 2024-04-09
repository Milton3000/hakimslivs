import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
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
import { MRT_Localization_SV } from 'material-react-table/locales/sv';

const AdminTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isIdVisible, setIsIdVisible] = useState(true);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: 'title',
        header: 'Titel',
      },
      {
        accessorKey: 'category',
        header: 'Kategori',
      },
      {
        accessorKey: 'brand',
        header: 'Tillverkare',
      },
      {
        accessorKey: 'origin',
        header: 'Ursprung',
      },
      {
        accessorKey: 'price',
        header: 'Pris',
      },
      {
        accessorKey: 'description',
        header: 'Beskrivning',
        muiEditTextFieldProps: {
          multiline: true,
        },
        muiCreateTextFieldProps: {
          multiline: true,
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Kvantitet',
      },
      {
        accessorKey: 'weight',
        header: 'Vikt',
      },
      {
        accessorKey: 'TOC',
        header: 'TOC',
        muiEditTextFieldProps: {
          multiline: true,
        },
        muiCreateTextFieldProps: {
          multiline: true,
        },
      },
      {
        accessorKey: 'imageUrl',
        header: 'Bildkälla',
        muiEditTextFieldProps: {
          multiline: true,
        },
        muiCreateTextFieldProps: {
          multiline: true,
        },
      },
    ];
  
    if (!isIdVisible) {
      baseColumns.unshift({
        accessorKey: '_id',
        header: 'ID',
        enableEditing: false,
      });
    }
  
    return baseColumns;
  }, [isIdVisible]);

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
    if (window.confirm('Bekräfta borttagning av produkt')) {
      deleteProduct(row.original);
    }
  };

  const table = useMaterialReactTable({
    localization: MRT_Localization_SV,
    columns,
    data: fetchedProducts,
    initialState: {
      columnVisibility: {
        description: false,
        TOC: false,
        imageUrl: false,
        _id: false,
      }
    },
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
      setIsIdVisible(true);

    },
    onCreatingRowSave: (newData) => {
      handleCreateProduct(newData);
      setIsIdVisible(true);

    },
    onEditingRowCancel: () => {
      setValidationErrors({});
      setIsIdVisible(true);

    },
    onEditingRowSave: (newData) => {
      handleSaveProduct(newData);
      setIsIdVisible(true);

    },

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Ny produkt</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
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
        <DialogTitle variant="h3">Ändra produkt</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
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
        Lägg till produkt
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
