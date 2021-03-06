import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true; // Exibir loading até processar a requisição
        break;
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true; // Exibir loading até processar a requisição
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true; // Se deu sucesso informa que esta logado
        draft.loading = false; // Ocultar loading após completar requisição
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.loading = false; // Ocultar loading após completar requisição
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false; // Ocultar loading após completar requisição
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
