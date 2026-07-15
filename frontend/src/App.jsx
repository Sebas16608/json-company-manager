import { useState } from 'react'
import Notification from './components/Notification'
import CompaniesView from './components/CompaniesView'
import BranchesView from './components/BranchesView'
import CollaboratorsView from './components/CollaboratorsView'
import ImportJSON from './components/ImportJSON'

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBackToCompanies = () => {
    setSelectedCompany(null)
    setSelectedBranch(null)
  }

  const handleBackToBranches = () => {
    setSelectedBranch(null)
  }

  const handleImported = () => {
    setRefreshKey((k) => k + 1)
  }

  return (
    <>
      <header className="header">
        <h1>Company Manager</h1>
        {(selectedCompany || selectedBranch) && (
          <nav className="header-nav">
            <button onClick={handleBackToCompanies}>Empresas</button>
          </nav>
        )}
      </header>

      <div className="container">
        {!selectedCompany && (
          <>
            <ImportJSON onImported={handleImported} />
            <div className="mt-2" />
            <CompaniesView
              onSelectCompany={(c) => setSelectedCompany(c)}
              refreshKey={refreshKey}
            />
          </>
        )}

        {selectedCompany && !selectedBranch && (
          <BranchesView
            company={selectedCompany}
            onBack={handleBackToCompanies}
            onSelectBranch={(b) => setSelectedBranch(b)}
          />
        )}

        {selectedCompany && selectedBranch && (
          <CollaboratorsView
            branch={selectedBranch}
            onBack={handleBackToBranches}
          />
        )}
      </div>

      <Notification />
    </>
  )
}
