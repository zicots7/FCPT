export default function Dashboard(){

    return (
        <div>
           <div className="container-fluid p-0">
    <header className="py-5 bg-white border-bottom">
        <div className="container my-5 text-center">
            <h1 className="display-4 fw-bold text-dark">Track Milestones. <span className="text-primary">Get Paid.</span></h1>
            <p className="lead text-muted mx-auto">
                The simplest way for freelancers to manage project payments. Track milestones in one organized dashboard.
            </p>
        </div>
    </header>

    <section id="features" className="container py-5">
        <div className="row g-4 py-5">
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                    <div className="display-5 text-primary mb-3"><i className="bi bi-layers"></i></div>
                    <h3>Milestones</h3>
                    <p className="text-muted">Break projects into phases. Only start the next task once the current milestone is paid.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                    <div className="display-5 text-success mb-3"><i className="bi bi-currency-exchange"></i></div>
                    <h3>Flexible Payments</h3>
                    <p className="text-muted">Support for UPI, Cards, Cash, and Crypto. Keep your financial records accurate.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                    <div className="display-5 text-info mb-3"><i className="bi bi-people"></i></div>
                    <h3>Client Portal</h3>
                    <p className="text-muted">Give clients a transparent view of their payment history and project progress also Logs to communicate easily.</p>
                </div>
            </div>
             <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                    <div className="display-5 text-info mb-3"><i className="bi bi-receipt-cutoff text-primary fs-3"></i></div>
                    <h3>Conversation Logs </h3>
                    <p className="text-muted">Track logs of conversation between freelancer and client .</p>
                </div>
            </div>
             <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                    <div className="display-5 text-info mb-3"><i className="bi bi-file-earmark-spreadsheet-fill fs-5"></i></div>
                    <h3>Generate Invoice </h3>
                    <p className="text-muted">Generate Project Invoice Easily with Single Click.</p>
                </div>
            </div>
        </div>
    </section>

    <div className="modal fade" id="demoModal" aria-labelledby="demoModalLabel" aria-hidden="true">
         </div> </div>
        </div>
    );
}