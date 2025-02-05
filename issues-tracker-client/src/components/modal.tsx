import { ModalContainer, ModalBackground } from "../styles";
import { FormState } from "../../types";

const ACTIONS = {
  ADD_TICKET: 'add ticket',
  SET_FORM_STATE: 'set-form-state'
}

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: any) => void;
  deleteTicket: (id: number) => void;
  updateTicket: (e: any,id: number, issue: string, description: string) => void;
  formState: FormState;
  dispatch: (something: any) => void;
}

const Modal = ({ setModalOpen, addTicket, updateTicket, deleteTicket, formState = { id: -Infinity, issue: '', description: ''}, dispatch  }: ModalPropsType) => {
  const { id, issue, description } = formState

  const handleChange = (e: any) => {
    e.preventDefault()
    dispatch({ 
      type: ACTIONS.SET_FORM_STATE,
      payload: { [e.target.name]: e.target.value }
    })
  }

  return (
    <ModalBackground>
      <ModalContainer onSubmit={addTicket}>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Close Modal
          </button>
        </div>
        <h1>Create a Ticket</h1>
        <form>
          <input name="issue" type="text" value={issue} onChange={handleChange} />
          <input name="description" type="text" value={description} onChange={handleChange} />
          <button>Add Ticket</button>
        </form>
          <button onClick={(e) => {
            updateTicket(e, id, issue, description)
          }}>
            Update Ticket
          </button>
          <button onClick={(e) => {
            deleteTicket(id)
          }}>
            Delete Ticket
          </button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;