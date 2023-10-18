// /* eslint-disable react/jsx-one-expression-per-line */
// /* eslint-disable no-nested-ternary */
// import { Link } from 'react-router-dom';
// import {
//   useMemo,
//   useState,
// } from 'react';
// import {
//   Container,
//   Header,
//   ListHeader,
//   EmptyListContainer,
//   Card,
//   InputSearchContainer,
//   SearchNotFoundContainer,
// } from './styles';

// // import Button from '../../components/Button';
// // import APIError from '../../errors/APIError';

// // import arrow from '../../assets/images/icons/arrow.svg';
// import edit from '../../assets/images/icons/edit.svg';
// import trash from '../../assets/images/icons/trash.svg';
// // import sad from '../../assets/images/sad.svg';
// import emptyBox from '../../assets/images/empty-box.svg';
// import magnifierQuestion from '../../assets/images/magnifier-question.svg';

// // import Loader from '../../components/Loader';

// import PageHeader from '../../components/PageHeader';
// // import toast from '../../utils/toast';

// export default function UploadContacts() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [files, setFiles] = useState([]);
//   const [hasError, setHasError] = useState(false);
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [fileBeingDeleted, setFileBeingDeleted] = useState(null);
//   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

//   const filteredFiles = useMemo(() => files.filter((file) => (
//     file.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )), [files, searchTerm]);

//   function handleChangeSearchTerm(event) {
//     setSearchTerm(event.target.value);
//   }

//   function handleDeleteFile(file) {
//     setFileBeingDeleted(file);
//     setIsDeleteModalVisible(true);
//   }

//   function handleCloseDeleteModal() {
//     setIsDeleteModalVisible(false);
//     setFileBeingDeleted(null);
//   }

//   return (
//     <Container>
//       {/* <Loader isLoading={isLoading} /> */}

//       <PageHeader
//         path="/"
//       />

//       {files.length > 0 && (
//       <InputSearchContainer>
//         <input
//           value={searchTerm}
//           type="text"
//           placeholder="Search category..."
//           onChange={handleChangeSearchTerm}
//         />
//       </InputSearchContainer>
//       )}

//       <Header
//         justifyContent={(
//           hasError
//             ? 'flex-end'
//             : (
//               files.length > 0
//                 ? 'space-between'
//                 : 'center'
//             )
//           )}
//       >
//         {(!hasError && files.length > 0) && (
//         <strong>
//           {filteredFiles.length}
//           {filteredFiles.length === 1 ? ' category' : ' categories'}
//         </strong>
//         )}
//         <Link to="/files/import">Import file</Link>
//       </Header>

//       {!hasError && (
//         <>
//           {(files.length < 1 && !isLoading) && (
//           <EmptyListContainer>
//             <img src={emptyBox} alt="Empty box" />

//             <p>
//               You don&apos;t have any file imported! Click the <strong>“Import File”</strong>
//               button above to import the first!
//             </p>
//           </EmptyListContainer>
//           )}

//           {(files.length > 0 && filteredFiles.length < 1 && (
//           <SearchNotFoundContainer>
//             <img src={magnifierQuestion} alt="Magnifier question" />
//             <span>No results were found for <strong>”{searchTerm}”</strong>.</span>
//           </SearchNotFoundContainer>
//           ))}

//           {/* {filteredFiles.length > 0 && (
//           <ListHeader orderBy={orderBy}>
//             <button type="button" className="sort-button" onClick={handleOrderBy}>
//               <span>Name</span>
//               <img src={arrow} alt="arrow" />
//             </button>
//           </ListHeader>
//           )} */}

//           {filteredFiles.map((file) => (
//             <Card key={file.id}>
//               <div className="info">
//                 <div className="file-name">
//                   <strong>
//                     {file.name}
//                   </strong>
//                 </div>
//               </div>

//               <div className="actions">
//                 <Link to={`file/show/${file.id}`}>
//                   <img src={edit} alt="show" />
//                 </Link>
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteFile(file)}
//                 >
//                   <img src={trash} alt="delete" />
//                 </button>
//               </div>
//             </Card>
//           ))}
//         </>
//       )}
//     </Container>
//   );
// }
