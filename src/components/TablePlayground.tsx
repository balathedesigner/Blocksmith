import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import styled from 'styled-components';
import { Pencil, Trash2, Package, Headphones, Monitor, CheckSquare, Square } from 'lucide-react';
import { Button } from './Button';

// Dummy Table component for preview (replace with your real Table component)
const TableWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow-x: auto;
  /* Set a max height for the table area */
  max-height: 340px;
`;

const ScrollableTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 300px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    background: #fff;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  th {
    background: #f3f4f6;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 2;
    box-shadow: 0 2px 2px -2px #e5e7eb;
    white-space: nowrap; /* Ensure header text is always in one line */
  }
  .actions-sticky {
    position: sticky;
    right: 0;
    background: #f3f4f6;
    z-index: 3;
    min-width: 56px;
    box-shadow: -4px 0 12px -2px rgba(0,0,0,0.10);
    border-left: 2px solid #e5e7eb;
  }
  .actions-sticky-td {
    position: sticky;
    right: 0;
    background: #fff;
    z-index: 2;
    min-width: 56px;
    box-shadow: -4px 0 12px -2px rgba(0,0,0,0.10);
    border-left: 2px solid #e5e7eb;
  }
`;

const CellContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div<{ bgColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  display: inline-flex;
  align-items: center;
  background-color: ${props => {
    switch (props.status) {
      case 'In Stock': return '#dcfce7';
      case 'Low Stock': return '#fef9c3';
      case 'Out of Stock': return '#fee2e2';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'In Stock': return '#166534';
      case 'Low Stock': return '#854d0e';
      case 'Out of Stock': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

function Table({ columns, data, selectable, loading, error, pagination, sortColumn, sortDirection, onSort, actionsEnabled, onDeleteRow }: {
  columns: string[];
  data: Array<Record<string, unknown>>;
  selectable: boolean;
  loading: boolean;
  error: boolean;
  pagination: boolean;
  sortColumn?: string | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (col: string) => void;
  actionsEnabled?: boolean;
  onDeleteRow?: (rowIdx: number) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map((_, i) => i) : []);
  };

  const handleSelectRow = (rowIdx: number, checked: boolean) => {
    setSelectedRows(prev => 
      checked ? [...prev, rowIdx] : prev.filter(i => i !== rowIdx)
    );
  };

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'Electronics': return <Monitor size={16} />;
      case 'Accessories': return <Package size={16} />;
      case 'Audio': return <Headphones size={16} />;
      default: return <Package size={16} />;
    }
  };

  const getProductAvatar = (name: string) => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];
    const colorIndex = name.length % colors.length;
    return (
      <Avatar bgColor={colors[colorIndex]}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
    );
  };

  if (error) return <TableWrapper><div style={{ color: '#ef4444', padding: 24 }}>Error loading data.</div></TableWrapper>;
  if (loading) return <TableWrapper><div style={{ color: '#6366f1', padding: 24 }}>Loading...</div></TableWrapper>;
  return (
    <TableWrapper>
      <ScrollableTableContainer>
        <StyledTable>
          <thead>
            <tr>
              {selectable && (
                <th style={{ width: 40 }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: '#6366f1'
                    }}
                    onClick={() => handleSelectAll(selectedRows.length < data.length)}
                  >
                    {selectedRows.length === data.length ? 
                      <CheckSquare size={18} /> : 
                      <Square size={18} />
                    }
                  </button>
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onClick={onSort ? () => onSort(col) : undefined}
                >
                  {col}
                  {sortColumn === col && (
                    <span style={{ marginLeft: 4, fontSize: 13 }}>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              {actionsEnabled && <th className="actions-sticky">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {selectable && (
                  <td style={{ width: 40 }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        color: '#6366f1'
                      }}
                      onClick={() => handleSelectRow(i, !selectedRows.includes(i))}
                    >
                      {selectedRows.includes(i) ? 
                        <CheckSquare size={18} /> : 
                        <Square size={18} />
                      }
                    </button>
                  </td>
                )}
                {columns.map(col => (
                  <td key={col}>
                    <CellContent>
                      {col === 'Product Name' && getProductAvatar(row[col] as string)}
                      {col === 'Category' && getProductIcon(row[col] as string)}
                      {col === 'Status' ? (
                        <StatusBadge status={row[col] as string}>{row[col] as string}</StatusBadge>
                      ) : (
                        row[col] as React.ReactNode
                      )}
                    </CellContent>
                  </td>
                ))}
                {actionsEnabled && (
                  <td className="actions-sticky-td">
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6366f1',
                        cursor: 'pointer',
                        marginRight: 8,
                        padding: 0,
                        verticalAlign: 'middle',
                      }}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: 0,
                        verticalAlign: 'middle',
                      }}
                      title="Delete"
                      onClick={onDeleteRow ? () => onDeleteRow(i) : undefined}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </ScrollableTableContainer>
      {pagination && (
        <div style={{ padding: 12, textAlign: 'right', color: '#888', fontSize: 14 }}>Pagination controls...</div>
      )}
    </TableWrapper>
  );
}

const DEFAULT_COLUMNS = ['Product ID', 'Product Name', 'Category', 'Price', 'Stock', 'Status'];

const DEFAULT_DATA: Array<Record<string, string>> = [
  { 'Product ID': 'P001', 'Product Name': 'Wireless Mouse', 'Category': 'Electronics', 'Price': '$29.99', 'Stock': '156', 'Status': 'In Stock' },
  { 'Product ID': 'P002', 'Product Name': 'Mechanical Keyboard', 'Category': 'Electronics', 'Price': '$89.99', 'Stock': '42', 'Status': 'Low Stock' },
  { 'Product ID': 'P003', 'Product Name': 'USB-C Cable 2m', 'Category': 'Accessories', 'Price': '$12.99', 'Stock': '238', 'Status': 'In Stock' },
  { 'Product ID': 'P004', 'Product Name': '27" 4K Monitor', 'Category': 'Electronics', 'Price': '$399.99', 'Stock': '0', 'Status': 'Out of Stock' },
  { 'Product ID': 'P005', 'Product Name': 'Laptop Stand', 'Category': 'Accessories', 'Price': '$24.99', 'Stock': '82', 'Status': 'In Stock' },
  { 'Product ID': 'P006', 'Product Name': 'Wireless Earbuds', 'Category': 'Audio', 'Price': '$79.99', 'Stock': '31', 'Status': 'Low Stock' },
  { 'Product ID': 'P007', 'Product Name': 'Desk Mat XL', 'Category': 'Accessories', 'Price': '$19.99', 'Stock': '124', 'Status': 'In Stock' },
  { 'Product ID': 'P008', 'Product Name': 'Webcam 1080p', 'Category': 'Electronics', 'Price': '$59.99', 'Stock': '0', 'Status': 'Out of Stock' },
  { 'Product ID': 'P009', 'Product Name': 'Gaming Headset', 'Category': 'Audio', 'Price': '$129.99', 'Stock': '67', 'Status': 'In Stock' },
  { 'Product ID': 'P010', 'Product Name': 'USB Hub 4-Port', 'Category': 'Accessories', 'Price': '$34.99', 'Stock': '95', 'Status': 'In Stock' }
];

export default function TablePlayground() {
  // Model
  const [columns, setColumns] = useState<string[]>(DEFAULT_COLUMNS);
  const [data, setData] = useState<Array<Record<string, string>>>(DEFAULT_DATA);
  const [selectable, setSelectable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [actionsEnabled, setActionsEnabled] = useState(false);

  // Controller
  const handleReset = () => {
    setColumns(DEFAULT_COLUMNS);
    setData(DEFAULT_DATA);
    setSelectable(false);
    setLoading(false);
    setError(false);
    setPagination(false);
    setSortColumn(null);
    setSortDirection('asc');
    setActionsEnabled(false);
  };

  // Sorting logic
  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!sortColumn) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortColumn] || '';
      const bVal = b[sortColumn] || '';
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  // Delete row handler
  const handleDeleteRow = (rowIdx: number) => {
    setData(rows => rows.filter((_, i) => i !== rowIdx));
  };

  // Presenter (controls)
  return (
    <ComponentPlaygroundLayout
      componentName="Table"
      description="A flexible table component for displaying tabular data with sorting, selection, and pagination."
      controls={[
        {
          type: 'checkbox',
          label: 'Selectable Rows',
          checked: selectable,
          onChange: setSelectable,
        },
        {
          type: 'checkbox',
          label: 'Loading',
          checked: loading,
          onChange: setLoading,
        },
        {
          type: 'checkbox',
          label: 'Error',
          checked: error,
          onChange: setError,
        },
        {
          type: 'checkbox',
          label: 'Pagination',
          checked: pagination,
          onChange: setPagination,
        },
        {
          type: 'checkbox',
          label: 'Show Actions Column',
          checked: actionsEnabled,
          onChange: setActionsEnabled,
        },
      ]}
      renderPreview={() => (
        <Table
          columns={columns}
          data={getSortedData()}
          selectable={selectable}
          loading={loading}
          error={error}
          pagination={pagination}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          actionsEnabled={actionsEnabled}
          onDeleteRow={handleDeleteRow}
        />
      )}
      renderControlsFooter={() => (
        <Button variant="solid" size="medium" onClick={handleReset} style={{ marginTop: 16 }}>
          Reset
        </Button>
      )}
    />
  );
} 