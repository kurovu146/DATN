import { listItemFooter } from '../../mocks'

function Footer() {

    const renderColumn = () => (
        listItemFooter.map((item, index) => (
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4" key={index}>
                <h6 className="text-uppercase fw-bold mb-4">{item.tittle}</h6>
                {item.data.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        ))
    );
    
    return (
        <footer className="text-center text-lg-start bg-dark pt-1 mt-5 text-muted position-relative">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Stack Overflow</h6>
                        <p>Stack Overflow helps people find the answers they need, when they need them.
                            We're best known for our public Q&A platform that over 100 million people visit
                            every month to ask questions, learn, and share technical knowledge.</p>
                    </div>
                    {renderColumn()}
                </div>
            </div>
            <div className="text-center p-4">
                © 2023 Stack Exchange Inc
            </div>
        </footer>
    )
}

export default Footer
