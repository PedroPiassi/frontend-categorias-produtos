import {
  Paper,
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton
} from '@mui/material'

export default function Table({ columns, data, noResults, loading }: TableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <MUITable size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`column-${index}`}
                  variant={'head'}
                  width={column.maxWidth ? column.maxWidth : ''}
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    color: '#fff',
                    padding: '5px 2px 5px 16px',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    borderLeft: '1px solid #e0e0e0',
                    borderRight: '1px solid #e0e0e0'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((row, rowIndex) => (
                <TableRow
                  key={`row-${rowIndex}`}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: '1px solid #e0e0e0'
                    }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={`column-${colIndex}`}
                      variant={'body'}
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderLeft: '1px solid #e0e0e0',
                        borderRight: '1px solid #e0e0e0'
                      }}
                    >
                      {loading ? (
                        <Skeleton animation={'wave'} width={100} height={column.skeletonHeight ?? 16} />
                      ) : (
                        <>
                          {column.key
                            ? column.render
                              ? column.render(row[column.key], row)
                              : row[column.key]
                            : column.render && column.render(null, row)}
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {data && data.length === 0 && noResults && (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
                  {loading ? <Skeleton animation={'wave'} height={16} /> : <>{noResults}</>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MUITable>
      </TableContainer>
    </>
  )
}

interface TableProps {
  columns: Column[]
  data: any[]
  noResults?: string
  loading?: boolean
}

interface Column {
  key?: string
  label: string
  skeletonHeight?: number
  render?: (value: any, row: any) => React.ReactNode
  clickable?: boolean
  maxWidth?: string
}
