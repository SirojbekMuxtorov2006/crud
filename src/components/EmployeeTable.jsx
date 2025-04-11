import React, { useState } from 'react'

export default function EmployeeCRUD() {
	const [employees, setEmployees] = useState([
		{
			id: 1,
			name: 'Jane Cooper',
			title: 'Technician',
			age: 27,
			role: 'Admin',
			workplace: 'Bosh ofis',
			group: '1-smena',
			skills: 'Elektronika, Muammo hal qilish',
			notes: 'Eng faol xodim',
		},
		{
			id: 2,
			name: 'Cody Fisher',
			title: 'Officer',
			age: 43,
			role: 'Ishchi',
			workplace: 'Zavod 1',
			group: '2-smena',
			skills: 'Nazorat, Mehnat xavfsizligi',
			notes: 'Tajribali ustoz',
		},
	])

	const [form, setForm] = useState({
		name: '',
		title: '',
		age: '',
		role: '',
		workplace: '',
		group: '',
		skills: '',
		notes: '',
	})
	const [editingId, setEditingId] = useState(null)

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (editingId !== null) {
			setEmployees(prev =>
				prev.map(emp =>
					emp.id === editingId
						? { ...emp, ...form, age: Number(form.age) }
						: emp
				)
			)
			setEditingId(null)
		} else {
			const newEmp = { ...form, id: Date.now(), age: Number(form.age) }
			setEmployees([...employees, newEmp])
		}
		setForm({
			name: '',
			title: '',
			age: '',
			role: '',
			workplace: '',
			group: '',
			skills: '',
			notes: '',
		})
	}

	const handleEdit = emp => {
		setForm({
			name: emp.name,
			title: emp.title,
			age: emp.age,
			role: emp.role,
			workplace: emp.workplace,
			group: emp.group,
			skills: emp.skills,
			notes: emp.notes,
		})
		setEditingId(emp.id)
	}

	const handleDelete = id => {
		setEmployees(employees.filter(emp => emp.id !== id))
	}

	return (
		<div className='container'>
			<h1 className='header'>Ish boshqarish</h1>

			<form onSubmit={handleSubmit} className='form'>
				<input
					name='name'
					value={form.name}
					onChange={handleChange}
					placeholder='Ism'
					required
				/>
				<input
					name='title'
					value={form.title}
					onChange={handleChange}
					placeholder='Lavozim'
					required
				/>
				<input
					name='age'
					type='number'
					value={form.age}
					onChange={handleChange}
					placeholder='Yosh'
					required
				/>
				<input
					name='role'
					value={form.role}
					onChange={handleChange}
					placeholder='Bo‘lim (Admin, Ishchi)'
					required
				/>
				<input
					name='workplace'
					value={form.workplace}
					onChange={handleChange}
					placeholder='Ishxona (Bosh ofis, Filial)'
					required
				/>
				<input
					name='group'
					value={form.group}
					onChange={handleChange}
					placeholder='Sinfi (1-smena, 2-smena)'
					required
				/>
				<input
					name='skills'
					value={form.skills}
					onChange={handleChange}
					placeholder='Ko‘nikmalar (masalan: IT, Marketing)'
					required
				/>
				<input
					name='notes'
					value={form.notes}
					onChange={handleChange}
					placeholder='Izohlar'
					required
				/>
				<button type='submit' className='btn'>
					{editingId ? 'Saqlash' : 'Qo‘shish'}
				</button>
			</form>

			<table className='employee-table'>
				<thead>
					<tr>
						<th>Ism</th>
						<th>Lavozim</th>
						<th>Yosh</th>
						<th>Bo‘lim</th>
						<th>Ishxona</th>
						<th>Sinfi</th>
						<th>Ko‘nikmalar</th>
						<th>Izoh</th>
						<th>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{employees.map(emp => (
						<tr key={emp.id}>
							<td>{emp.name}</td>
							<td>{emp.title}</td>
							<td>{emp.age}</td>
							<td>{emp.role}</td>
							<td>{emp.workplace}</td>
							<td>{emp.group}</td>
							<td>{emp.skills}</td>
							<td>{emp.notes}</td>
							<td>
								<button onClick={() => handleEdit(emp)} className='btn edit'>
									Tahrirlash
								</button>
								<button
									onClick={() => handleDelete(emp.id)}
									className='btn delete'
								>
									O‘chirish
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
