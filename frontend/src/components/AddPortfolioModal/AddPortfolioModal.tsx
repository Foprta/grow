import React from "react";
import { portfoliosAPI } from "../../services/portfoliosService";
import { IModalProps, Modal } from "../UI/Modal";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useFormik } from "formik";
import styles from "./AddPortfolioModal.module.scss";
import { PortfolioInDto } from "../../models/dto";
import * as yup from "yup";

const validationSchema: yup.SchemaOf<PortfolioInDto> = yup.object().shape({
  name: yup.string().required("Введите название портфолио"),
});

const AddPortfolioModal: React.FC<IModalProps> = ({ onClose, ...props }) => {
  const [addPortfolio] = portfoliosAPI.useAddPortfolioMutation();

  const { handleChange, values, handleSubmit, resetForm, isValid, errors } = useFormik<PortfolioInDto>({
    initialValues: { name: "" },
    onSubmit: (dto) => addPortfolio(dto).then(closeModal),
    validationSchema,
  });

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal onClose={closeModal} {...props}>
      <Card className={styles.formCard}>
        <CardHeader title="Добавить новое портфолио" />

        <form className={styles.portfolioForm} onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              fullWidth
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Имя нового портфолио"
              error={!!errors.name}
              helperText={errors.name}
            />
          </CardContent>

          <CardActions>
            <Button variant="outlined" color="error" onClick={closeModal}>
              Отмена
            </Button>

            <Button variant="contained" color="success" type="submit" disabled={!isValid}>
              Создать портфолио
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

export default AddPortfolioModal;
