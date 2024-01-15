import { memo, useState } from 'react';
import { questionApi } from '../../api';
import styles from './ModalAddQuestion.module.css';
import { checkToken } from '../../helper/utils';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

interface IPropsModalAddQuestion {
    getReloadData: () => void;
}

function ModalAddQuestion(props: IPropsModalAddQuestion) {
    const { getReloadData } = props;

    const [title, setTitle] = useState<string>('');
    const [textContent, setTextContent] = useState<string>('');
    const [tagName, setTagName] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const validation = () => {
        if (title && textContent && tagName) return true;
        return false;
    };

    const resetStateInput = () => {
        setTitle('');
        setTextContent('');
        setTagName('');
    };

    const handleSubmit = () => {
        const question = {
            title,
            textContent,
            tagName
        };

        setIsSubmit(true);

        if (!validation()) return;
        questionApi.postApiQuestion(question)
            .then(res => {
                toast.success(res?.data?.message);
                setIsSubmit(false);
                resetStateInput();
                getReloadData();
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.message);
            })
    };

    const renderDialogAddQuestion = () => (
        <div className="modal-dialog modal-lg modal-dialog-centered ">
            <div className={`${styles.modalContent} modal-content ${isSubmit ? 'was-validated' : ''}`}>
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Add Question</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className={`${styles.modalBody} modal-body`}>
                    <form className='modal-add-question'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <div className="invalid-feedback"> Please fill a title.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="codeContent" className="form-label fw-bold">What are the code of your problem?</label>
                            <CKEditor editor={ClassicEditor} data={textContent} onChange={(event: any, editor: any) => setTextContent(editor.getData())} />
                            <div className={isSubmit && !textContent ? `${styles.font14} text-danger` : "valid-feedback"}> Please fill a code.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tagName" className="form-label fw-bold">Tag name</label>
                            <input type="text" className="form-control" id="tagName" name="tagName" value={tagName} onChange={(e) => setTagName(e.target.value)} required />
                            <div className="invalid-feedback"> Please fill a tag.</div>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss={validation() ? "modal" : ""} onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    );

    const renderDialogLogin = () => (
        <div className="modal-dialog modal-dialog-centered">
            <div className={`${styles.modalContent} modal-content`}>
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Join the Stack Overflow community</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body mb-3">
                    <h6>You must be logged in to ask a question on Stack Overflow</h6>
                    <Link to="/login">
                        <button data-bs-dismiss="modal" className='w-100 btn btn-outline-primary my-2 mt-3'>Login</button>
                    </Link>
                    <Link to="/register">
                        <button data-bs-dismiss="modal" className='w-100 btn btn-outline-primary'>Register</button>
                    </Link>
                </div>
            </div>
        </div >
    );

    return (
        <>
            <div className="modal fade" id="addQuestion" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                {checkToken() ? renderDialogAddQuestion() : renderDialogLogin()}
            </div>
            <ToastContainer />
        </>
    );
}

export default memo(ModalAddQuestion)
