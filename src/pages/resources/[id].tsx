import FabProgress from "@/shared/components/fabProgress/FabProgress";
import { IResourcesProps, IResultsProps } from "@/shared/types/Types";
import { useRouter } from "next/router";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InferType, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseLayout } from "@/shared/components/baseLayout/BaseLayout";
import { Box, MenuItem, TextField } from "@mui/material";
import {
  getDataById,
  postData,
  updateData,
} from "@/shared/libs/rest/RESTClient";

const validationSchema = object({
  id: number(),
  name: string()
    .min(2, "O Campo precisa ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
  description: string()
    .min(2, "O Campo precisa ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
  status: string()
    .min(2, "O Campo precisa ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
}).required();

type TFormData = InferType<typeof validationSchema>;

export default function GroupDetails() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [resource, setResource] = useState<IResourcesProps>();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<TFormData> = (values: TFormData) => {
    setResource(values as IResourcesProps);
    switch (isAddMode) {
      case true:
        setIsPosting(true);
        break;
      case false:
        setIsUpdating(true);
        break;
    }
  };

  const statuses = [
    { value: "INVALID", label: "Selecione o status aqui" },
    { value: "ACTIVE", label: "ATIVO" },
    { value: "INACTIVE", label: "INATIVO" },
  ];

  const isAddMode: boolean = Number(id) === 0 ? true : false;
  const endpointURL: string = "resources";

  const handleResponse = (variant: VariantType, message: String) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (!isAddMode && isLoading) {
      const fetchData = async () => {
        const response = await getDataById(`/api/${endpointURL}/${id}`);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IResourcesProps = json.data;

        switch (success) {
          case true:
            setIsLoading(false);
            setResource(data);
            handleResponse("success", message);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (resource) {
      !isAddMode ? setValue("id", resource.id) : "";
      setValue("name", resource.name);
      setValue("description", resource.description);
      setValue("status", resource.status);
      setIsLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    if (isPosting) {
      const postingData = async () => {
        const response = await postData(`/api/${endpointURL}`, resource);
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IResourcesProps = json.data;

        switch (success) {
          case true:
            setResource(data);
            setIsPosting(false);
            setIsLoading(false);
            reset();
            handleResponse("success", message);
            router.push(`/${endpointURL}`);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      postingData();
    }
  }, [resource]);

  useEffect(() => {
    if (isUpdating) {
      const updatingData = async () => {
        const response = await updateData(
          `/api/${endpointURL}/${id}`,
          resource
        );
        const json = await response.json();
        const { success, message, error }: IResultsProps = json;
        const data: IResourcesProps = json.data;

        switch (success) {
          case true:
            setResource(data);
            setIsUpdating(false);
            setIsLoading(false);
            reset();
            handleResponse("success", message);
            router.push(`/${endpointURL}`);
            break;
          case false:
            handleResponse("error", String(error));
            break;
          default:
            break;
        }
      };
      updatingData();
    }
  }, [resource]);

  return (
    <BaseLayout
      title="Recursos"
      subtitle={
        isAddMode
          ? "Formulário de cadastro de recursos"
          : "Formulário de modificação de dados de recursos"
      }
    >
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
      >
        <form>
          {!isAddMode && (
            <Box>
              <TextField
                label="id"
                type={"number"}
                disabled
                fullWidth
                variant="filled"
                size="small"
                error={!!errors.id}
                placeholder={"Insira o id aqui"}
                InputLabelProps={{ shrink: true }}
                helperText={errors.id ? errors.id.message : ""}
                {...register("id")}
              />
            </Box>
          )}
          <Box>
            <TextField
              label="Nome"
              type={"text"}
              fullWidth
              variant="filled"
              size="small"
              error={!!errors.name}
              placeholder={"Insira o nome aqui"}
              InputLabelProps={{ shrink: true }}
              helperText={errors.name ? errors.name.message : ""}
              {...register("name")}
            />
          </Box>
          <Box>
            <TextField
              label="Descrição"
              type={"text"}
              fullWidth
              variant="filled"
              size="small"
              error={!!errors.description}
              placeholder={"Insira a descrição aqui"}
              InputLabelProps={{ shrink: true }}
              helperText={errors.description ? errors.description.message : ""}
              {...register("description")}
            />
          </Box>
          <Box>
            <TextField
              label="Status"
              fullWidth
              variant="filled"
              size="small"
              select
              error={!!errors.status}
              defaultValue={isAddMode ? "INVALID" : resource?.status}
              InputLabelProps={{ shrink: true }}
              helperText={errors.status ? errors.status.message : ""}
              {...register("status")}
            >
              {statuses.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <FabProgress
            isLoading={isLoading}
            isSaving={isPosting || isUpdating}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </Box>
    </BaseLayout>
  );
}
