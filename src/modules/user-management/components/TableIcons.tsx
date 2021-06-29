import React, { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Edit from '@material-ui/icons/Edit';
import SaveAlt from '@material-ui/icons/SaveAlt';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Search from '@material-ui/icons/Search';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Remove from '@material-ui/icons/Remove';
import ViewColumn from '@material-ui/icons/ViewColumn';

// eslint-disable-next-line import/prefer-default-export
export const tableIcons = {
  // @ts-ignore
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} data-cy="table-add" />),
  // @ts-ignore
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} data-cy="table-check" />),
  // @ts-ignore
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} data-cy="table-clear" />),
  // @ts-ignore
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} data-cy="table-delete" />),
  DetailPanel: forwardRef((props, ref) => (
    // @ts-ignore
    <ChevronRight {...props} ref={ref} data-cy="table-detail-panel" />
  )),
  // @ts-ignore
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} data-cy="table-edit" />),
  // @ts-ignore
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} data-cy="table-export" />),
  // @ts-ignore
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} data-cy="table-filter" />),
  FirstPage: forwardRef((props, ref) => (
    // @ts-ignore
    <FirstPage {...props} ref={ref} data-cy="table-first-page" />
  )),
  // @ts-ignore
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} data-cy="table-last-page" />),
  NextPage: forwardRef((props, ref) => (
    // @ts-ignore
    <ChevronRight {...props} ref={ref} data-cy="table-next-page" />
  )),
  PreviousPage: forwardRef((props, ref) => (
    // @ts-ignore
    <ChevronLeft {...props} ref={ref} data-cy="table-previous-page" />
  )),
  ResetSearch: forwardRef((props, ref) => (
    // @ts-ignore
    <Clear {...props} ref={ref} data-cy="table-reset-search" />
  )),
  // @ts-ignore
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} data-cy="table-search" />),
  SortArrow: forwardRef((props, ref) => (
    // @ts-ignore
    <ArrowDownward {...props} ref={ref} data-cy="table-sort-arrow" />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    // @ts-ignore
    <Remove {...props} ref={ref} data-cy="table-third-state-check" />
  )),
  ViewColumn: forwardRef((props, ref) => (
    // @ts-ignore
    <ViewColumn {...props} ref={ref} data-cy="table-view-column" />
  )),
};
