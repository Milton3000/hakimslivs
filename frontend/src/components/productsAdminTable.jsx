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
import { useDeleteProduct } from '../adminhooks/product.hooks/deleteProduct'; 
import { useGetProducts } from '../adminhooks/product.hooks/getProducts'; 
import { useUpdateProduct } from '../adminhooks/product.hooks/updateProduct'; 
import { useCreateProduct } from '../adminhooks/product.hooks/createProduct';
import { validateProduct } from '../adminhooks/product.hooks/validateProduct'; 
import { MRT_Localization_SV } from 'material-react-table/locales/sv';

const AdminTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isIdVisible, setIsIdVisible] = useState(true);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: 'title',
        header: 'Titel',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: 'category',
        header: 'Kategori',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              category: undefined,
            }),
        },
      },
      {
        accessorKey: 'brand',
        header: 'Tillverkare',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.brand,
          helperText: validationErrors?.brand,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              brand: undefined,
            }),
        },
      },
      {
        accessorKey: 'origin',
        header: 'Ursprung',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.origin,
          helperText: validationErrors?.origin,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              origin: undefined,
            }),
        },
      },
      {
        accessorKey: 'price',
        header: 'Pris',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
      {
        accessorKey: 'unit_price',
        header: 'Jämförpris',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.unit_price,
          helperText: validationErrors?.unit_price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              unit_price: undefined,
            }),
        },
      },
      {
        accessorKey: 'description',
        header: 'Beskrivning',
        muiEditTextFieldProps: {
          multiline: true,
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
        muiCreateTextFieldProps: {
          multiline: true,
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Kvantitet',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        },
      },
      {
        accessorKey: 'unit',
        header: 'Enhet',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.unit,
          helperText: validationErrors?.unit,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              unit: undefined,
            }),
        },
      },
      {
        accessorKey: 'weight',
        header: 'Vikt',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.weight,
          helperText: validationErrors?.weight,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              weight: undefined,
            }),
        },
      },
      {
        accessorKey: 'TOC',
        header: 'TOC',
        muiEditTextFieldProps: {
          multiline: true,
          required: true,
          error: !!validationErrors?.TOC,
          helperText: validationErrors?.TOC,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              TOC: undefined,
            }),
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
          required: true,
          error: !!validationErrors?.imageUrl,
          helperText: validationErrors?.imageUrl,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              imageUrl: undefined,
            }),
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
    useUpdateProduct(); 
  //call DELETE hook
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct(); 

  //CREATE action
  const handleCreateProduct = async ({ values, table }) => {
    const newValidationErrors = validateProduct(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createProduct(values);
    table.setCreatingRow(null);   //exit creating mode
  };

  //UPDATE action
  const handleSaveProduct = async ({ values, table }) => {
    const newValidationErrors = validateProduct(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
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
    positionActionsColumn: 'end',
    initialState: {
      columnVisibility: {
        description: false,
        TOC: false,
        origin: false,
        imageUrl: false,
        _id: false,
      },
      pagination: { 
        pageSize: 20, 
        pageIndex: 0,
       },
       density: 'compact',
    },
    createDisplayMode: 'modal', 
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
        minHeight: '41rem',
        backgroundColor: '#FBFCFE',
      },
    },
    muiTableHeadCellProps: ({
      sx: {
        backgroundColor: '#FBFCFE',
      },
    }),
    muiTableBodyCellProps: ({
      sx: {
        backgroundColor: '#FBFCFE',
      },
    }),
    muiBottomToolbarProps: ({
      sx: {
        backgroundColor: '#FBFCFE',
      },
    }),
    muiTopToolbarProps: ({
      sx: {
        backgroundColor: '#FBFCFE',
      },
    }),
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
        <DialogTitle sx={{ fontSize: '32px' }} variant="h3">Ny produkt</DialogTitle>
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
        <DialogTitle sx={{ fontSize: '32px' }} variant="h3">Ändra produkt</DialogTitle>
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
            color="black"
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
