import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getBoardDirectors, updatePagination } from "../../../../redux/reducers/boardDirector"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import axios from "utils/axios"

const SoDoToChucComponent = React.memo(props => {
    const { boardDirectors, pagination, getBoardDirectors, updatePagination } = props,
        { total, page, limit } = pagination,
        router = useRouter(),
        [startDrop, setStartDrop] = useState(null)

    useEffect(() => {
        getBoardDirectors()
    }, [page, limit])

    const deleteBoardDirector = async id => {
        try {
            const res = await axios.delete(`/board-director/${id}`)
            if (res.status === 200) {
                getBoardDirectors()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onDragStart = e => {
        setStartDrop(Number(e.currentTarget.dataset.position))
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = e => {

        const newBoardDirector = boardDirectors,
            oldItem = boardDirectors[startDrop]
        newBoardDirector.splice(startDrop, 1)
        newBoardDirector.splice(Number(e.currentTarget.dataset.position), 0, oldItem)
        newBoardDirector.map((boardDirector, index) => {
            boardDirector.position = page * limit + index
            return boardDirector
        })
        setStartDrop(null)
        updatePosition(newBoardDirector.map(banner => ({ _id: banner._id, position: banner.position })))
    }

    const updatePosition = async lstPostition => {
        try {
            const res = await axios.put("/board-directors/position", lstPostition)
            if (res.status === 200) {
                getBoardDirectors()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updatePage = page => {
        const newPagination = { ...pagination, page }
        updatePagination(newPagination)
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Sơ đồ tổ chức</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Chức vụ</th>
                                <th scope="col">Hình ảnh</th>
                                <th className="text-center" scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/ve-chung-toi/so-do-to-chuc/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardDirectors.map((boardDirector, index) => (
                                <tr
                                    draggable={true}
                                    onDragStart={onDragStart}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                    data-position={index}
                                    key={boardDirector._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{boardDirector.name}</td>
                                    <td>{boardDirector.title}</td>
                                    <td>
                                        <img src={boardDirector.img} alt={`boardDirector-${boardDirector._id}`} height={150} />
                                    </td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => router.push(`/admin/ve-chung-toi/so-do-to-chuc/${boardDirector._id}`)}>
                                            <i className="fas fa-edit mx-1"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteBoardDirector(boardDirector._id)}>
                                            <i className="fas fa-trash mx-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {pagination.total > 0 && (
                <nav className="w-100">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${pagination.page === 0 && "disabled"}`} onClick={() => pagination.page > 0 && updatePage(pagination.page - 1)}>
                            <button className="page-link">Trang trước</button>
                        </li>
                        {Array.from({ length: (total % limit === 0) ? total / limit : (total - total % limit) / limit + 1 }, () => Math.floor(Math.random() * 40)).map((_, index) => (
                            <li className={`page-item ${page === index && "active"}`} key={index} onClick={() => updatePage(index)}>
                                <button className="page-link">{index}</button>
                            </li>
                        ))}
                        <li className={`page-item ${pagination.page === (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && "disabled"}`} onClick={() => pagination.page < (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && updatePage(pagination.page + 1)}>
                            <button className="page-link">Trang kế tiếp</button>
                        </li>
                    </ul>
                </nav>
            )}
        </React.Fragment>
    )
})

const mapStateToProps = state => ({
    boardDirectors: state.boardDirector.data,
    pagination: state.boardDirector.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getBoardDirectors,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SoDoToChucComponent)