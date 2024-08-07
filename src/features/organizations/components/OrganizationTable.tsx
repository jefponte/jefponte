import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
  ptBR,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/Organization";
import { useDemoData } from '@mui/x-data-grid-generator';

type Props = {
  organizations: Results | undefined;
  paginationModel: object;
  isFetching: boolean;
  handleSetPaginationModel: (paginateModel: { page: number, pageSize: number }) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
};

export function OrganizationTable({
  organizations,
  paginationModel,
  isFetching,
  handleSetPaginationModel,
  handleFilterChange,

}: Props) {
  const { data  } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });



  const columns: GridColDef[] = [

    {
      field: "id",
      headerName: "Id",
      type: "string",
      width: 150,
      renderCell: renderNameCell,
    },
    { field: "name", headerName: "Nome", flex: 1, renderCell: renderNameCell },
    { field: "email", headerName: "E-mail", flex: 1, renderCell: renderNameCell },
    { field: "login", headerName: "Login", flex: 1, renderCell: renderNameCell }
  ];

  function mapDataToGridRows(data: Results) {
    const { data: organizations } = data;
    return organizations.map((organization) => ({
      id: organization.id,
      name: organization.name,
      created_at: organization.created_at,
    }));
  }


  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/organizations/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }


  const rows = organizations ? mapDataToGridRows(organizations) : [];
  const rowCount = organizations?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 450, width: '100%' }}>
      <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          pagination: {
            ...data.initialState?.pagination,
            paginationModel: paginationModel,
          },
        }}
        onPaginationModelChange={handleSetPaginationModel}
        columns={columns}
        rows={rows}
        filterMode="server"
        rowCount={rowCount}
        loading={isFetching}
        paginationMode="server"
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        onFilterModelChange={handleFilterChange}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}