import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import TableData from "@/shared/components/tableData/TableData";
import { deleteData, getAllData } from "@/shared/libs/rest/RESTClient";
import { IGroupsProps, IResultsProps } from "@/shared/types/Types";
import { DeleteForever, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Groups() {
  const [groups, setGroups] = useState<IGroupsProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const endpointURL: string = "groups";
  const router = useRouter();

  const columns = [
    { field: "id", headerName: "ID`s", flex: 0.5 },
    {
      field: "name",
      headerName: "NOMES",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "DESCRIÇÕES",
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "AÇÕES",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      headerAlign: "center",
      align: "center",

      renderCell: (params: any) => {
        const { id } = params.row;

        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Excluir">
              <IconButton
                aria-label="excluir"
                onClick={() => handleDelete(String(id))}
                color={"error"}
              >
                <DeleteForever />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(String(id))}
                color={"warning"}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  const handleAdd = async () => {
    router.push(`/${endpointURL}/0`);
  };

  const handleEdit = async (id: string) => {
    router.push(`/${endpointURL}/${id}`);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        const response = await getAllData(`/api/${endpointURL}`);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IGroupsProps[] = json.data;

        switch (success) {
          case true:
            setIsLoading(false);
            setGroups(data);
            break;
          case false:
            break;
          default:
            break;
        }
      };
      fetchData();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isDeleting) {
      const deletingData = async () => {
        const result = await deleteData(`/api/${endpointURL}/${deleteId}`);
        const json = await result.json();
        const { success, message, error }: IResultsProps = json;

        switch (success) {
          case true:
            setIsDeleting(false);
            setDeleteId("");
            setIsLoading(true);
            break;
          case false:
            break;
          default:
            break;
        }
      };
      deletingData();
    }
  }, [isDeleting]);

  return (
    <BaseLayout
      title="Grupos"
      subtitle="Listagem de grupos que acessam o sistema"
    >
      {!isLoading && (
        <TableData
          rows={groups}
          columns={columns}
          isLoading={isLoading}
          addButton={handleAdd}
        />
      )}
    </BaseLayout>
  );
}
