import PropTypes from 'prop-types';
import { getDiagnosticDataByUUID } from '../../firebase/firestore/diagnoses';

const Diagnosis = ({uuid}) => {
    const data = getDiagnosticDataByUUID(uuid);

    if (!data) {
        return <div>Loading...</div>;
    } else print(data);

    return (
        <div>
            <h1>Diagnosis</h1>
            <p>UUID: {uuid}</p>
            <p>Data: {data}</p>
        </div>
    );
};

Diagnosis.propTypes = {
    uuid: PropTypes.string.isRequired,
};

export default Diagnosis;