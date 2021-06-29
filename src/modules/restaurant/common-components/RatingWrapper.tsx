import styled from 'styled-components/macro';
import React, { PureComponent } from 'react';
import Rating from 'modules/common/components/controls/Rating';
import { Typography, withStyles } from '@material-ui/core';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'modules/common/components/controls/Button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
`;

const StyledButton = withStyles({
  root: {
    padding: '16px',
  },
})(Button);

type Props = {
  averageRating: number;
  numberOfReviews?: number;
  text?: string;
  canEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export class RatingWrapper extends PureComponent<Props & WithTranslation> {
  onEdit = () => {
    const { onEdit } = this.props;

    if (onEdit) {
      onEdit();
    }
  };

  onDelete = () => {
    const { onDelete } = this.props;

    if (onDelete) {
      onDelete();
    }
  };

  render() {
    const {
      averageRating,
      numberOfReviews,
      t,
      canEdit = true,
      text = t('component.restaurant-item.reviews', { numberOfReviews }),
    } = this.props;

    return (
      <Wrapper>
        <Rating value={averageRating} precision={0.5} readOnly size="large" />
        <Typography variant="subtitle1" color="textSecondary">
          {text}
        </Typography>
        {canEdit ? (
          <span>
            <StyledButton asIcon onClick={this.onEdit}>
              <EditIcon />
            </StyledButton>
            <StyledButton asIcon onClick={this.onDelete}>
              <DeleteIcon />
            </StyledButton>
          </span>
        ) : null}
      </Wrapper>
    );
  }
}

export default withTranslation(I18N_CORE)(RatingWrapper);
