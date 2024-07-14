import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NavLink } from 'react-router-dom';

function DomainTemplate({domain}) {
    return ( <>
    
        <NavLink to={`/domain/${domain.id}`} className="bg-white border border-3  border-neutral-200 rounded-2xl shadow-lg shadow-zinc-200 p-3">
                    <h2 className="text-2xl font-bold text-left">{domain.domain}</h2>
                    <div className="grid grid-cols-2 font-semibold text-left text-zinc-500 text-md my-3">
                        <p><AccessTimeIcon fontSize='' className='me-1 mb-1'/>{domain.starting_date.split(" ")[1]}</p>
                        <p><LocalOfferIcon fontSize='' className='me-1 mb-1'/> lasted bid : $ {domain.exists_since}</p>
                    </div>
        </NavLink>
    
    </> );
}

export default DomainTemplate;