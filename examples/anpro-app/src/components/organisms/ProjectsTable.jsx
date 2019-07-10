import React from 'react'
import { PrimaryActionButton } from '../atomics/PrimaryActionButton'

export function ProjectsTable ({
  projects = [],
  message = '',
  isLoading = false,
  onRefresh = () => {},
}) {
  return (
    <>
      <div>{message}</div>
      <div style={{border: '1px solid black', height: 'calc(100vh - 80px)'}}>
        <PrimaryActionButton
          actionText={'Aktualisieren'}
          onAction={onRefresh}
        />
        <table>
          <thead>
            <tr>
              <th>Nummer</th>
              <th>Titel</th>
              <th>Ort</th>
              <th>Klassifizierung</th>
              <th>Datum</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading && <tr><td colSpan="5">Es lädt!</td></tr>
            }
            {
              projects.map(({id, title, city, classifier, date}) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{city}</td>
                    <td>{classifier}</td>
                    <td>{date}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}