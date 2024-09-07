import { Typography } from '@mui/material';
import ConsultationStatusTag from '../../../../../components/tag/ConsultationStatusTag';
import GenderTag from '../../../../../components/tag/GenderTag';
import { ConsultationStatus } from '../../../../../types/Consultation';
import { GenderType } from '../../../../../types/Share';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';
import {
  getConsultationRealTimeList,
  IGetConsultationRealTimeListRequest,
  IGetConsultationRealTimeListResponse,
} from '../../../../../services/ConsultationService';
import { FilterValues } from '../../consultation/pages/ConsultationListPage';
import { AuthContext } from '../../../../../context/AuthContext';
import { UserRoleType } from '../../../../../types/Users';
import useRealTimeSocket from '../../../../../hooks/UseRealTimeSocket';
import { RoomNumberType } from '../../../../../types/ConsultationRoom';

interface IRealTimeListProps {
  onApply: (filters: FilterValues) => void;
  clinicId?: string;
  consultationRoomNumber?: RoomNumberType;
}

const columns: IColumn[] = [
  {
    label: '患者',
    id: 'patient',
    minWidth: 120,
    render: (value: any) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {`${value.lastName}${value.firstName}`}
          <GenderTag type={value.gender as GenderType} />{' '}
        </div>
      );
    },
  },
  { label: '號碼', id: 'consultationNumber', minWidth: 120 },
  {
    label: '狀態',
    id: 'status',
    minWidth: 120,
    render: (value: ConsultationStatus) => {
      return <ConsultationStatusTag type={value} />;
    },
  },
  {
    label: '醫師',
    id: 'doctor',
    minWidth: 120,
    render: (value: any) => {
      return `${value.lastName}${value.firstName}`;
    },
  },
  {
    label: '退掛',
    id: 'isOnsiteCanceled',
    minWidth: 120,
    render: (value: boolean) => {
      if (value) {
        return <Typography sx={{ color: '#A40000' }}>退掛</Typography>;
      }
      return null;
    },
  },
];

const RealTimeList: React.FC<IRealTimeListProps> = ({
  clinicId,
  consultationRoomNumber,
}) => {
  const [realTimeListData, setRealTimeListData] =
    useState<IGetConsultationRealTimeListResponse>({
      data: [],
      totalCounts: 0,
      pagination: {
        pages: [],
        totalPage: 0,
        currentPage: 1,
        prev: 0,
        next: 0,
      },
    });

  const { state } = useContext(AuthContext);
  const currentUser = state.currentUser;
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(
    parseInt(queryParams.get('page') || '1', 10),
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    parseInt(queryParams.get('limit') || '25', 10),
  );

  const shouldFetch =
    currentUser?.role === UserRoleType.DOCTOR ||
    (currentUser?.role === UserRoleType.ADMIN && clinicId !== undefined);

  const { data, isLoading } = useSWR(
    shouldFetch
      ? [
          'getConsultationRealTimeList',
          clinicId,
          consultationRoomNumber,
          page,
          rowsPerPage,
        ]
      : null,
    () => {
      const query: any = {};

      if (clinicId) query.clinicId = clinicId;
      if (consultationRoomNumber)
        query.consultationRoomNumber = consultationRoomNumber;
      query.page = page;
      query.limit = rowsPerPage;

      return getConsultationRealTimeList({
        query,
        currentUser,
      } as IGetConsultationRealTimeListRequest);
    },
    {
      onSuccess: (data) => {
        setRealTimeListData(data);
      },
      revalidateOnFocus: false,
    },
  );

  const handleRealTimeUpdate = (updatedRow: any) => {
    setRealTimeListData((prevData) => {
      if (updatedRow.status === ConsultationStatus.WAITING_FOR_CONSULTATION) {
        return {
          ...prevData,
          data: [updatedRow, ...prevData.data],
        };
      }

      const updatedData = prevData.data.map((item) =>
        item.id === updatedRow.id ? { ...item, ...updatedRow } : item,
      );

      return {
        ...prevData,
        data: updatedData,
      };
    });
  };

  useRealTimeSocket({
    clinicId,
    consultationRoomNumber,
    setRealTimeData: setRealTimeListData,
    onMessage: handleRealTimeUpdate,
  });

  useEffect(() => {
    if (!shouldFetch) return;
  }, [clinicId, consultationRoomNumber, shouldFetch]);

  const consultations = realTimeListData.data || [];
  const totalCounts = realTimeListData.totalCounts || 0;

  const maxPage = totalCounts ? Math.ceil(totalCounts / rowsPerPage) : 1;
  const effectivePage = Math.max(0, Math.min(page - 1, maxPage - 1));

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleClickConsultation = (id: string) => {
    navigate(`/consultation/${id}`, {
      state: {
        from: {
          pathname: window.location.pathname,
          search: window.location.search,
        },
      },
    });
  };

  return (
    <StickyHeadTable
      columns={columns}
      data={consultations || []}
      count={totalCounts || 0}
      page={effectivePage}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickConsultation}
      isLoading={isLoading}
    />
  );
};

export default RealTimeList;
