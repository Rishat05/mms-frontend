import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import api from '../../api';

const RepairCost = () => {
    const { id } = useParams();
    const [mansion, setMansion] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await api.get(`/mansions/${id}`);
                console.log(response.data.data);
                setMansion(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    let divisionRowSpan;
    const calculateDivRowSpan = (divisionIndex) => {
        divisionRowSpan = 0;
        mansion.repair_plans[0].repair_divisions[divisionIndex].repair_items.forEach((item) => {
            item.repair_subitems.forEach((subItem) => {
                divisionRowSpan += subItem.repair_categories.length;
            });
        });

        return divisionRowSpan;
    };
    const calculateItemRowSpan = (divisionIndex, itemIndex) => {
        divisionRowSpan = 0;
        mansion.repair_plans[0].repair_divisions[divisionIndex].repair_items[itemIndex].repair_subitems.forEach((subItem) => {
            divisionRowSpan += subItem.repair_categories.length;
        });
        return divisionRowSpan;
    };

    const handleContentChange = (MansionIndex, DivisionIndex, ItemIndex, subItemIndex, categorySubItem, value, type) => {
        return value;
    }
    const handleQuantityChange = (MansionIndex, DivisionIndex, ItemIndex, subItemIndex, categoryIndex, value, type) => {
        return value;
    }

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className='ml-5'>

            {mansion && <>
                <div className='w-3/4 mx-auto flex justify-between my-5'>
                    <div>
                        <h1 className='text-2xl font-semibold p-2'>Mansion name: <span className='text-green-400'>{mansion.name}</span> </h1>
                        <div className='flex text-lg'>
                            <h1 className='p-2 font-semibold'>Select Plan : </h1>
                            <select value={selectedOption} onChange={handleChange} className='border rounded-xl ml-1 p-2 bg-gray-100' >
                                {mansion.repair_plans.map((planItem, planIndex) =>
                                    <option value={planItem.name} key={planItem.id}> {planItem.name}</option>
                                    // <option value="option1">Option 1</option>
                                    // <option value="Plan 3">Plan 3</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <button className='btn bg-green-400'>Confirm</button>
                </div>
                <div className="overflow-x-auto">
                    <table className='border-collapse border border-slate-300 p-2 table-auto'>
                        {/* <table className="table table-compact mx-3 my-5 rounded-xl"> */}
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='p-3'>Division</th>
                                <th className='p-3'>Item</th>
                                <th className='p-3'>SubItem</th>
                                <th className='p-3'>Construction Repair</th>
                                <th className='p-3'>Quantity</th>
                                <th className='p-3'>Unit price</th>
                                {/* <th>Total</th>
                                <th>Amount Of Money</th> */}
                                <th className='p-3'>Repair period</th>

                            </tr>
                        </thead>
                        <tbody>
                            {mansion.repair_plans[0].repair_divisions.map((division, divisionIndex) => (
                                division.repair_items.map((item, itemIndex) => (
                                    item.repair_subitems.map((subItem, subItemIndex) => (
                                        subItem.repair_categories.map((categorySubItem, categorySubItemIndex) => (
                                            < tr key={categorySubItem.id} >
                                                {itemIndex === 0 && subItemIndex === 0 && categorySubItemIndex == 0 && (
                                                    <td rowSpan={calculateDivRowSpan(divisionIndex)} className='border border-slate-300'
                                                    ><input type="text"
                                                        defaultValue={division.name}
                                                        onBlur={(e) => handleContentChange(MansionIndex,
                                                            divisionIndex,
                                                            itemIndex,
                                                            subItemIndex,
                                                            categorySubItemIndex,
                                                            e.target.value,
                                                            'divisionName')}
                                                        className='p-2'
                                                        />

                                                    </td>
                                                )}
                                                {subItemIndex === 0 && categorySubItemIndex == 0 && (
                                                    <td rowSpan={calculateItemRowSpan(divisionIndex, itemIndex)} className='border border-slate-300'>
                                                        <input type="text"
                                                            defaultValue={item.name}
                                                            onBlur={(e) => handleContentChange(MansionIndex,
                                                                divisionIndex,
                                                                itemIndex,
                                                                subItemIndex,
                                                                categorySubItemIndex,
                                                                e.target.value,
                                                                'itemName')}
                                                            className='p-2'
                                                        />
                                                    </td>
                                                )}

                                                {categorySubItemIndex == 0 && (
                                                    <td rowSpan={subItem.repair_categories.length} className='border border-slate-300'>
                                                        <input type="text"
                                                            defaultValue={subItem.name}
                                                            onBlur={(e) => handleContentChange(MansionIndex,
                                                                divisionIndex,
                                                                itemIndex,
                                                                subItemIndex,
                                                                categorySubItemIndex,
                                                                e.target.value,
                                                                'subItemName')}
                                                            className='p-2'
                                                        /></td>
                                                )}
                                                <td className='border border-slate-300'>
                                                    <input type="text"
                                                        defaultValue={categorySubItem.name}
                                                        onBlur={(e) => handleContentChange(MansionIndex,
                                                            divisionIndex,
                                                            itemIndex,
                                                            subItemIndex,
                                                            categorySubItemIndex,
                                                            e.target.value,
                                                            'categorySubItemName')}
                                                        className='p-2'
                                                    /></td>


                                                <td className='border border-slate-300'>
                                                    <input
                                                        type="text"
                                                        placeholder="quantity"
                                                        defaultValue={categorySubItem.quantity}
                                                        onBlur={(e) =>
                                                            handleQuantityChange(
                                                                MansionIndex,
                                                                divisionIndex,
                                                                itemIndex,
                                                                subItemIndex,
                                                                categorySubItemIndex,
                                                                e.target.value,
                                                                "quantity"
                                                            )
                                                        }
                                                        className="p-2"
                                                    />
                                                </td>
                                                <td className='border border-slate-300'>
                                                    <input
                                                        type="text"
                                                        placeholder="unit price"
                                                        defaultValue={categorySubItem.unit_price}
                                                        onBlur={(e) =>
                                                            handleQuantityChange(
                                                                MansionIndex,
                                                                divisionIndex,
                                                                itemIndex,
                                                                subItemIndex,
                                                                categorySubItemIndex,
                                                                e.target.value,
                                                                "unit"
                                                            )
                                                        }
                                                        className="p-2"
                                                    />
                                                </td>
                                                {/* <td className='border border-slate-300'>
                                                    <div className="" id='total'>{categorySubItem.total}</div>
                                                </td>

                                                {subItemIndex === 0 && categorySubItemIndex == 0 && (
                                                    <td rowSpan={calculateItemRowSpan(divisionIndex, itemIndex)} className='border border-slate-300'>
                                                        <div className=" p-3">{item.amount}</div>
                                                    </td>
                                                )} */}
                                                <td className='border border-slate-300'>
                                                    <input type="text"
                                                        defaultValue={categorySubItem.repair_period}
                                                        onBlur={(e) => handleContentChange(MansionIndex,
                                                            divisionIndex,
                                                            itemIndex,
                                                            subItemIndex,
                                                            categorySubItemIndex,
                                                            e.target.value,
                                                            'categorySubItemYear')}
                                                        className='p-2'
                                                    />
                                                </td>
                                            </tr>

                                        ))
                                    ))

                                )
                                )
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </>}
        </div>
    );
};

export default RepairCost;